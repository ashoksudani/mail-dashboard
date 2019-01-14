import React from 'react';
import { Grid, Button, Modal, Label } from 'semantic-ui-react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const OpenEmail = props => {
  if (!props.email) {
    return null;
  }
  const { email } = props;
  const from = <Label>{email.from.emailId}</Label>;
  const to = email.to.map((user, i) => (
    <Label key={user.emailId + i}>{user.emailId}</Label>
  ));
  const cc = email.cc.map((user, i) => (
    <Label key={user.emailId + i}>{user.emailId}</Label>
  ));
  const editorState = EditorState.createWithContent(convertFromRaw(email.body));

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Modal.Header>{email.subject}</Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Column width={2}>
            <label>From:</label>
          </Grid.Column>
          <Grid.Column width={14}>{from}</Grid.Column>
          <Grid.Column width={2}>
            <label>To:</label>
          </Grid.Column>
          <Grid.Column width={14}>{to}</Grid.Column>
          <Grid.Column width={2}>
            <label>CC:</label>
          </Grid.Column>
          <Grid.Column width={14}>{cc}</Grid.Column>
          <Grid.Column width={2}>
            <label>Message:</label>
          </Grid.Column>
          <Grid.Column width={14}>
            <Editor
              wrapperClassName="editor-read-only"
              editorState={editorState}
              readOnly={true}
              toolbar={{ options: [] }}
            />
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default OpenEmail;
