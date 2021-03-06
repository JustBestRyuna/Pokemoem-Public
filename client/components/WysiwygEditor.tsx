import dynamic from 'next/dynamic';
import * as React from 'react';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import { TuiEditorWithForwardedProps } from './TuiEditorWrapper';

interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(() => import("./TuiEditorWrapper"), { ssr: false });
const EditorWithForwardedRef = React.forwardRef<EditorType | undefined, EditorPropsWithHandlers>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));

interface Props extends EditorProps {
  onChange(value: string): void;

  valueType?: "markdown" | "html";
}

const WysiwygEditor: React.FC<Props> = (props) => {
  const { initialValue, previewStyle, height, initialEditType, useCommandShortcut, placeholder } = props;

  const editorRef = React.useRef<EditorType>();
  const handleChange = React.useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();
    const valueType = props.valueType || "markdown";

    props.onChange(valueType === "markdown" ? instance.getMarkdown() : instance.getHtml());
  }, [props, editorRef]);

  return <div>
    <EditorWithForwardedRef
      {...props}
      initialValue={initialValue || ""}
      previewStyle={previewStyle || "vertical"}
      height={height || "400px"}
      initialEditType={initialEditType || "wysiwyg"}
      useCommandShortcut={useCommandShortcut || true}
      placeholder={placeholder || "내용을 입력해주세요."}
      ref={editorRef}
      onChange={handleChange}
    />
  </div>;
};

export default WysiwygEditor;