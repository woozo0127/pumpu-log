// Unwrap React.memo components from react-native so UNSAFE_getByType works
// with React 19 + react-test-renderer, which stores SimpleMemoComponent fibers
// using the inner function type rather than the memo wrapper object.
const RN = require('react-native');
const PressableMemo = RN.Pressable;
if (PressableMemo && PressableMemo.$$typeof === Symbol.for('react.memo')) {
  Object.defineProperty(RN, 'Pressable', {
    get: () => PressableMemo.type,
    configurable: true,
  });
}
