import React, { Component } from 'react';
import {
  Button,
  Modal,
  Form,
  Dropdown,
  Input,
  Segment
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { selectUsers, selectProfile } from 'selectors';

class ComposeEmail extends Component {
  initialState = {
    form: {
      to: [],
      cc: [],
      subject: '',
      body: EditorState.createEmpty()
    },
    error: {}
  };

  state = {
    form: Object.assign({}, this.initialState.form),
    error: Object.assign({}, this.initialState.error)
  };

  onFieldChange = (event, obj) => {
    var target = obj.name;
    var value = obj.value;

    this.setErrorFor(value, target);
    this.setState(state => {
      state.form[target] = value;
      return state;
    });
  };

  onEditorChange = editorState => {
    this.setState(state => {
      state.form.body = editorState;
      return state;
    });
  };

  setErrorFor(value, target) {
    this.setState(state => {
      state.error[target] = !Boolean(value);
      return state;
    });
  }

  onSend = () => {
    console.log(this);
    let foundError = false;
    const to = this.state.form['to'];
    const cc = this.state.form['cc'];
    const subject = this.state.form['subject'];
    const body = convertToRaw(this.state.form['body'].getCurrentContent());

    if (!to) {
      this.setErrorFor(to, 'to');
      foundError = true;
    }

    if (!cc) {
      this.setErrorFor(cc, 'cc');
      foundError = true;
    }

    if (!subject) {
      this.setErrorFor(subject, 'subject');
      foundError = true;
    }

    if (!foundError) {
      this.props.onSendEmail({
        from: this.props.profile.user,
        to,
        cc,
        subject,
        body
      });
      this.resetState();
      this.props.onClose();
    }
  };

  handleClose = () => {
    this.resetState();
    this.props.onClose();
  };

  resetState = () => {
    this.setState({
      form: Object.assign({}, this.initialState.form),
      error: Object.assign({}, this.initialState.error)
    });
  };

  render() {
    const userList = this.props.users.map(user => ({
      key: user.id,
      value: user.id,
      text: user.emailId
    }));

    return (
      <Modal open={this.props.open} onClose={this.handleClose}>
        <Modal.Header>New message</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field required>
              <label>To:</label>
              <Dropdown
                placeholder="To"
                name="to"
                multiple
                search
                selection
                options={userList}
                value={this.state.form.to}
                error={this.state.error.to}
                onChange={this.onFieldChange}
              />
            </Form.Field>

            <Form.Field required>
              <label>CC:</label>
              <Dropdown
                placeholder="CC"
                name="cc"
                multiple
                search
                selection
                options={userList}
                value={this.state.form.cc}
                error={this.state.error.cc}
                onChange={this.onFieldChange}
              />
            </Form.Field>

            <Form.Field required>
              <label>Subject:</label>
              <Input
                placeholder="subject"
                name="subject"
                value={this.state.form.subject}
                error={this.state.error.subject}
                onChange={this.onFieldChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Message:</label>
              <Segment>
                <Editor
                  editorState={this.state.form.body}
                  onEditorStateChange={this.onEditorChange}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  toolbar={{
                    options: [
                      'inline',
                      'blockType',
                      'fontSize',
                      'fontFamily',
                      'list',
                      'textAlign',
                      'colorPicker',
                      'link',
                      'image',
                      'remove',
                      'history'
                    ]
                  }}
                />
              </Segment>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button
            positive
            icon="send"
            labelPosition="right"
            content="Send"
            onClick={this.onSend}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    profile: selectProfile(state),
    users: selectUsers(state)
  };
};

export default connect(mapStateToProps)(ComposeEmail);
