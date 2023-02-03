"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeWebview = require("react-native-webview");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function isHaveSignature(signature) {
  return Boolean(signature && Number.isFinite(signature.x) && Number.isFinite(signature.x) && Number.isFinite(signature.page));
}
const PenaReact = props => {
  const url = (0, _react.useMemo)(() => {
    const result = new URL(props.url);
    if (props.lang) result.searchParams.set('lang', props.lang);
    if (props.privyId) result.searchParams.set('privyId', props.privyId);
    if (isHaveSignature(props.signature)) {
      result.searchParams.set('x', props.signature.x.toString());
      result.searchParams.set('y', props.signature.y.toString());
      result.searchParams.set('page', props.signature.page.toString());
      result.searchParams.set('fixed', props.signature.fixed ? 'true' : 'false');
    }
    return result;
  }, [props]);
  function onMessage(event) {
    if (event.nativeEvent.url === url.hostname) {
      try {
        const payload = JSON.parse(event.nativeEvent.data);
        if (typeof props.onAfterAction === 'function') props.onAfterAction(payload);
      } catch (error) {
        console.warn(error);
      }
    }
  }
  return /*#__PURE__*/_react.default.createElement(_reactNativeWebview.WebView, {
    source: {
      uri: url.href
    },
    domStorageEnabled: true,
    onMessage: onMessage
  });
};
var _default = PenaReact;
exports.default = _default;
//# sourceMappingURL=Pena.js.map