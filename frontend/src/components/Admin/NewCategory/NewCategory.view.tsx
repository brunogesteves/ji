import React from 'react';
import { useLogic } from './NewCategory.logic';

export default function NewCategory({ setFieldValue }) {
  const { data, methods } = useLogic();

  return (
    <div className="my-3 text-md  text-center text-red-500 focus:outline-none selection:outline-none">
      <div className="mb-2">
        <select
          defaultValue={data.categoryChoosed}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFieldValue(e.target.value);

            if (e.target.value === 'Adicionar uma categoria') {
              methods.setInputArea(true);
              setFieldValue('');
            } else {
              methods.setInputArea(false);
            }
          }}>
          <option
            className="text-xs uppercase py-5 text-white bg-red-500"
            value="0"
            selected
            disabled>
            Selecione uma categoria
          </option>
          <option className="text-xs bg-red-500  uppercase py-5 text-white">
            Adicionar uma categoria
          </option>
          {data.data?.getAllCategories.map((cat: { name: string }, i: number) => {
            return (
              <option
                key={i}
                value={cat.name.toUpperCase()}
                className=" text-xs bg-red-500 text-white">
                {cat.name.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      {!data.inputArea ? (
        ''
      ) : (
        <>
          <span> Digite a nova categoria:</span>
          <input
            type="text"
            name="name"
            className="bg-red-500 text-white ps-1 focus:outline-none rounded-lg "
            value={data.wordInput}
            onChange={(e) => methods.setWordInput(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              methods.createCategory({ variables: { newCategoryName: data.wordInput } });
            }}>
            <span className="flex justify-center bg-red-700 w-auto cursor-pointer mt-5 rounded-lg px-3 text-white">
              Adicionar
            </span>
          </button>
        </>
      )}
    </div>
  );
}
