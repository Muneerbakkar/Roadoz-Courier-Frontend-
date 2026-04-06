export function useToast() {
  return {
    toast: (props) => {
      console.log("Toast:", props.title, props.description);
    },
  };
}
