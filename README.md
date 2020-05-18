This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## 搜索结果页-数据结构与模块设计

### 视图层

- 顶部，时间选择
- 中间，车次列表
- 底部，筛选栏

### 数据层

- 页面数据：
  - from: null
  - to: null
  - departDate: h0(Date.now()) //会从 url 中解析出来
  - trainList: [] //车次列表

- 筛选项数据：
  - orderType: ORDER_PART //出发早到晚或耗时短到长
  - onlyTickets: false //只看有票
  - ticketTypes: [] //坐席类型
  - checkedTicketTypes: {} //选中的坐席类型
  - trainTypes: [] //车次类型
  - checkedTrainTypes: {} //选中的车次类型
  - departStations: [] //出发车站
  - checkedDepartStations: {}
  - arriveStations: [] //到达车站
  - checkedArriveStations: {}
  - departTimeStart: 0 //出发时间开始
  - departTimeEnd: 24 //出发时间结束
  - arriveTimeStart: 0
  - arriveTimeEnd: 24
  - isFiltersVisible: false //筛选框是否显示
  - searchParsed: false //标识是否解析了 URL 参数
