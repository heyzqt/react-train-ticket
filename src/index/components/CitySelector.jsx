import React, { useState, useMemo, useEffect, memo, useCallback } from "react";
import PropTypes from "prop-types";
import "./CitySelector.scss";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from "axios";
import { api } from "../api";
//根据城市选择浮层视图分析结构可知，主要包含以下内容
//- 城市搜索框
//- 字母索引
//- 城市列表
//1. 城市内容条目
//2. 包含某个首字母的城市名字的集合
//3. 整个城市布局视图

//字母列表索引实现思路
//1. 字母表的显示，拿到26个字母表，然后显示出来
//2. 给每个字母的模块添加数据属性，作为滚动时候的标记
//3. 点击字母，查找对应字母模块，并滚动到对应位置

//搜索建议-实现思路
//服务端
//1. 服务器根据搜索关键词返回搜索结果
//客户端
//1. 编写SuggestItem显示搜索结果的Item控件
//2. 编写Suggest控件作为搜索结果的包裹控件
//3. 在Suggest控件中编写搜索逻辑
//- 用户搜索关键词，返回搜索结果，并显示在界面，实现方式useEffect
//- 注意1：搜索结果中需要对搜索关键词做判断，只针对当前搜索的关键词的内容做显示
//4. 点击搜索结果后，关闭城市选择浮层，返回结果给火车票页

function CityItem(props) {
  const { name, onSelect } = props;
  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  );
}

CityItem.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

function CitySection(props) {
  const { title, cities = [], onSelect } = props;
  return (
    <ul className="city-ul">
      <li className="city-li" data-cate={title}>
        {title}
      </li>
      {cities.map((item) => {
        return (
          <CityItem
            key={item.name}
            name={item.name}
            onSelect={() => onSelect(item.name)}
          ></CityItem>
        );
      })}
    </ul>
  );
}

CitySection.propTypes = {
  title: PropTypes.string.isRequired,
  cities: PropTypes.array,
  onSelect: PropTypes.func.isRequired
};

//生成字母表数据
const alphabet = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index);
});

//字母Item组件
const AlphaIndex = memo((props) => {
  const { alpha, onClick } = props;
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
});

AlphaIndex.propTypes = {
  alpha: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

function CityList(props) {
  const { sections, onSelect, toAlpha } = props;
  console.log("CityList update");
  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map((item) => {
          return (
            <CitySection
              key={item.title}
              title={item.title}
              cities={item.citys}
              onSelect={onSelect}
            ></CitySection>
          );
        })}
      </div>
      <div className="city-index">
        {alphabet.map((alpha) => {
          return <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />;
        })}
      </div>
    </div>
  );
}

CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  toAlpha: PropTypes.func.isRequired
};

const SuggestItem = memo((props) => {
  const { name, onClick } = props;
  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>
      {name}
    </li>
  );
});

SuggestItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const Suggest = memo((props) => {
  const { searchKey, onSelect } = props;
  const [result, setResult] = useState([]);

  useEffect(() => {
    console.log("Suggest useEffect");
    axios
      .get(api.searchCity + "?key=" + encodeURIComponent(searchKey))
      .then((res) => {
        if (searchKey === res.data.searchKey) {
          setResult(res.data.result);
        }
      });
  }, [searchKey]);

  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [{ display: searchKey }];
    }
    return result;
  }, [result, searchKey]);

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map((item) => {
          return (
            <SuggestItem
              key={item.display}
              name={item.display}
              onClick={onSelect}
            ></SuggestItem>
          );
        })}
      </ul>
    </div>
  );
});

Suggest.propTypes = {
  searchKey: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

function CitySelector(props) {
  const { show, cityData, isLoading, onBack, fetchCityData, onSelect } = props;
  const [searchKey, setSearchKey] = useState("");

  const key = useMemo(() => {
    return searchKey.trim();
  }, [searchKey]);

  useEffect(() => {
    console.log("CitySelector useEffect");
    if (!show || cityData || isLoading) {
      return;
    }
    fetchCityData();
  }, [show, cityData, isLoading]);

  const outputCitySections = (props) => {
    if (isLoading) {
      return <div>Loading......</div>;
    }

    const toAlpha = (alpha) => {
      document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
    };

    if (cityData) {
      return (
        <div>
          <CityList
            sections={cityData.cityList}
            onSelect={onSelect}
            toAlpha={toAlpha}
          ></CityList>
        </div>
      );
    }

    return <div>error</div>;
  };

  return (
    <div className={classnames("city-selector", { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={onBack}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            value={searchKey}
            placeholder="城市、车站的中文或拼音"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <i
            className={classnames("search-clean", { hidden: key.length === 0 })}
            onClick={() => setSearchKey("")}
          >
            &#xf063;
          </i>
        </div>
      </div>
      {/* 一定要searchKey合法才显示Suggest组件，否则Suggest中的useEffect Hook函数会调用，会报错 */}
      {Boolean(searchKey) && (
        <Suggest searchKey={searchKey} onSelect={onSelect} />
      )}
      {outputCitySections()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySelector);

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired
};
