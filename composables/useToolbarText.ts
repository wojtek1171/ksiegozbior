export default function useToolbarText() {
  const toolbarText = ref('');
  console.log('use');
  console.log(toolbarText.value);

  function changeText(text) {
    toolbarText.value = text;
  }

  return {
    toolbarText,
    changeText,
  };
}
