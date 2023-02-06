import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const SettingsPage: FC<Props> = (props) => {
  return (
    <div>
      <h1>SettingsPage</h1>
    </div>
  );
};

export default SettingsPage;
