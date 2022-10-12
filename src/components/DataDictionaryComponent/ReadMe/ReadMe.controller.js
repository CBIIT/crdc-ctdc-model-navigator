import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ReadMeComponent from './ReadMe.component';

const ReadMeController = ({
  display,
  displayReadMeDialog,
}) => {
  const [content, setContent] = useState(undefined);

  const config = useSelector((state) => (state.submission && state.submission.readMeConfig
      ? state.submission.readMeConfig : undefined));

  useEffect(() => {
    if (config) {
      axios.get(config.readMeUrl).then((response) => {
        return response;
      }).then((resp) => {
        if (resp.data) {
          setContent(resp.data);
        }
      });
    }
  }, []);

  if (!content) {
    return <></>;
  }

  return (
    <>
      <ReadMeComponent
        display={display}
        displayReadMeDialog={displayReadMeDialog}
        content={content}
        title={config.readMeTitle}
      />
    </>
  );
}

export default ReadMeController;
