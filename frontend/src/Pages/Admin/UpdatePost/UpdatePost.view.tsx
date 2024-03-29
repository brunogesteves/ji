import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { Field, Form, Formik } from 'formik';
import { ToastContainer } from 'react-toastify';

import Admin from '../../../components/Admin/AdminLayout.view';
import { PostContentSchema } from '../../../libs/yup';
import { useLogic } from './UpdatePost.logic';
import NewCategory from '../../../components/Admin/NewCategory/NewCategory.view';
import ImagesAdmin from '../../../components/Admin/ImagesAdmin/ImagesAdmin';

import { PostProps } from '../../../Utils/types';

export default function UpdatePost() {
  const { data, methods } = useLogic();

  return (
    <Admin>
      <Formik
        initialValues={data.initialValues}
        validationSchema={PostContentSchema}
        enableReinitialize={true}
        onSubmit={(values: PostProps, actions) => {
          methods.updatePost(values);
          actions.resetForm();
        }}>
        {({ errors, touched, setFieldValue }) => (
          <Form className=" flex justify-center h-screen px-3 gap-x-3">
            <div>
              <button
                type="submit"
                className="  inline-block rounded my-5  mx-10 cursor-pointer bg-red-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ">
                Publicar Post
              </button>
              {methods.formField('name', '', 'text', errors, touched)}
              {methods.formField('scheduled', 'Agendado', 'checkbox', errors, touched)}
              {methods.formField('slide', 'Slide', 'checkbox', errors, touched)}
              {methods.formField('middle', 'Meio', 'checkbox', errors, touched)}
              {methods.formField('gameplay', 'Gameplay', 'checkbox', errors, touched)}
              {methods.formField('main', 'Corpo da Página', 'checkbox', errors, touched)}

              <NewCategory setFieldValue={(cat: string) => setFieldValue('category', cat)} />

              {errors.category && touched.category ? (
                <div className="text-red-500 mb-3">{errors.category}</div>
              ) : null}
              <div className="mt-4">
                <ImagesAdmin
                  thumbName={(thumbName: string) => {
                    setFieldValue('thumb', thumbName);
                    methods.setThumbName(thumbName);
                  }}
                />
                {errors.thumb && touched.thumb ? (
                  <div className="text-red-500">{errors.thumb}</div>
                ) : null}
              </div>
              <img
                src={`${process.env.REACT_APP_API_URL_FILES}/${
                  data.thumbName || data.initialValues.thumb
                }`}
                alt={data.thumbName || data.initialValues.thumb}
                className="w-40 m-6 mt-1"
              />
            </div>
            <div className="mt-4 h-full z-0">
              <Field name="content">
                {({ field, meta }) => (
                  <div>
                    <div className="updateContent-form">
                      <SunEditor
                        {...field}
                        setContents={data.initialValues.content}
                        ref={data.editor}
                        lang="pt_br"
                        width="92%"
                        height="500"
                        name="my-editor"
                        setOptions={{
                          mode: 'classNameNameic',
                          katex: 'window.katex',
                          imageWidth: '(auto)',
                          // imageHeight: "(auto)",
                          // imageUploadUrl: `${process.env.PUBLIC_URL}/ckimage`,
                          imageAccept: '*',
                          // imageGalleryUrl: `${process.env.PUBLIC_URL}/images`,
                          imageFileInput: true,
                          // videoFileInput: false,
                          tabDisable: false,
                          buttonList: [
                            [
                              'undo',
                              'redo',
                              'font',
                              'fontSize',
                              'formatBlock',
                              'paragraphStyle',
                              'blockquote',
                              'bold',
                              'underline',
                              'italic',
                              'strike',
                              'subscript',
                              'superscript',
                              'fontColor',
                              'hiliteColor',
                              'textStyle',
                              'removeFormat',
                              'outdent',
                              'indent',
                              'align',
                              'horizontalRule',
                              'list',
                              'lineHeight',
                              'table',
                              'link',
                              'image',
                              'video',
                              'audio',
                              'math',
                              'imageGallery',
                              'fullScreen',
                              'showBlocks',
                              'codeView',
                              'preview',
                              'print',
                              'save',
                              'template'
                            ]
                          ]
                        }}
                        onChange={(data) => {
                          // setCotent(data);
                          if (data === '<p><br></p>') {
                            setFieldValue('content', '');
                          } else {
                            setFieldValue('content', data);
                          }
                        }}
                        onImageUploadBefore={(files) => {
                          let nameImage = files[0].name;
                          // setFile(files[0]);
                          data.editor.current.editor.insertHTML(`<img src="/${nameImage}">`);
                          return true;
                        }}
                      />
                    </div>

                    {meta.touched && meta.error && <div className="error">{meta.error}</div>}
                  </div>
                )}
              </Field>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </Admin>
  );
}
