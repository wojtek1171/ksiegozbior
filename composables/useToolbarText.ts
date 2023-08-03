export default function useToolbarText() {
  const toolbarText = ref('');

  function changeText(text) {
    toolbarText.value = text;
  }

  return {
    toolbarText,
    changeText,
  };
}
