import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

import Container from '../../components/Container/Container';
import ErrorPage from '../ErrorPage/ErrorPage.view';

import { useLogic } from './Post.logic';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Post() {
  const { data } = useLogic();

  const override: CSSProperties = {
    display: 'block',
    margin: '10px auto',
    borderColor: 'red'
  };

  return (
    <Container>
      {!data ? (
        <ClipLoader
          color="red"
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="flex justify-between">
          <div
            className="sun-editor-editable bg-red-500"
            dangerouslySetInnerHTML={{
              __html: data.data?.frontPostQuery?.content
            }}
          />
          <div className="w-3/12 my-2">
            <div className="flex flex-col gap-y-2">
              {data.randomPosts?.getRandomPosts.map((post, i) => {
                return (
                  <div>
                    <Link to={`/${post.thumb}`}>
                      <img src={`/${post.thumb}`} alt={post.slug} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}