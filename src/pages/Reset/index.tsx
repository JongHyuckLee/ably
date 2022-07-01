import { default as ResetComponent } from "components/Reset";
import ResetStore from "components/Reset/ResetStore";

const Reset = () => {
  return (
    <ResetStore>
      <ResetComponent />
    </ResetStore>
  );
};

export default Reset;
