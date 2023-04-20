import React from 'react';
import Admin from '../../../components/Admin/AdminLayout.view';

import { AiTwotoneDelete } from 'react-icons/ai';
import { useLogic } from './Categories.logic';

export default function Categories(props) {
  const { data, methods } = useLogic();

  return (
    <Admin>
      <div className="h-screen pt-2 text-center ">
        Digite a nova categoria:
        <div className="flex justify-center gap-x-2 items-start">
          <div>
            <input
              type="text"
              name="name"
              value={data.wordInput}
              className="placeholder:bg-gray-500 rounded border-0 bg-red-500 focus:outline-none px-2 text-white"
              onChange={(e) => (e ? methods.setWordInput(e.target.value) : null)}
            />
          </div>
          <div>
            <button
              // onClick={
              //   wordInput
              //     ? () => {
              //         createCategory({ variables: { name: wordInput } });
              //         setWordInput("");
              //       }
              //     : null
              // }
              className="bg-red-500 w-auto px-2 rounded text-white">
              Adicionar
            </button>
          </div>
        </div>
        {data.data?.getAllCategories.map((res, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center mt-6 text-capitalize w-full ">
              {res.name.toUpperCase()}
              <button
                onClick={() => {
                  methods.deleteCategory({ variables: { id: res.id } });
                }}>
                <AiTwotoneDelete color="red" />
              </button>
            </div>
          );
        })}
      </div>
    </Admin>
  );
}
