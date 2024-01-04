import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export interface ISMCTinyMCE6ComponentProps {
  content?: string;
  height?: number;
  width?: number;
  apiKey?: string;
  notifyChangeFunction?: (content: string) => void;
}

export default function SMCTinyMCE6Component(props: ISMCTinyMCE6ComponentProps) {
  const editorRef = useRef<any>(null);

  // log the content
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // notify the parent component of the change
  const notifyChange = () => {
    if(props.notifyChangeFunction) {
      props.notifyChangeFunction(editorRef.current.getContent());
    }
  }

  // set the height and width of the editor
  const height = props.height ? props.height : 500;
  const width = props.width ? props.width : 500;

  // Update the height and width of the editor
  if(editorRef.current) {
    editorRef.current.editorContainer.style.height = `${height}px`;
    editorRef.current.editorContainer.style.width = `${width}px`;
  }

  // render the editor
  return (
    <Editor
    apiKey={props.apiKey}
    onInit={(evt, editor) => editorRef.current = editor}
    initialValue={props.content}
    init={{
      height: height,
      promotion: false,
      menubar: true,
      resize: false,
			quickbars_selection_toolbar: false, 
			quickbars_insert_toolbar: false,
			link_context_toolbar: true,
			list_indent_on_tab: true,
			statusbar: false,
			placeholder: "Enter text here...",
      skin: 'fluent',
      content_css: 'fluent',
      toolbar_mode: 'floating',
      plugins: 'advlist anchor autolink charmap code codesample directionality emoticons help image insertdatetime link lists media nonbreaking pagebreak preview searchreplace table template visualblocks visualchars wordcount',
      toolbar: 'undo redo | blocks | bold italic strikethrough forecolor backcolor blockquote | link image media emoticons | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat',
      content_style: "body { font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }",
      setup: (editor) => {
        editor.on('blur', function(e) {
          notifyChange();
        });
        editor.on('change', function(e) {
          //notifyChange();
        });
      }
    }}
  />
  );
}