import React from "react";
import { FullPageWrapper, LoaderWrapper, Spinner } from "./LoadingStyles";

import spinnerImage from "../../../assets/spinner.png"; // Replace with the actual path to your spinner image

const Loading: React.FC = () => {
  return (
    <FullPageWrapper>
      <LoaderWrapper>
        <Spinner />
      </LoaderWrapper>
    </FullPageWrapper>
  );
};

export default Loading;
