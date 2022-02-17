import React from "react";
import { Link } from "react-router-dom";

import "./Blocks.css";

import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS_MIDSECTION } from "../../../Graphql/Queries";

export default function Blocks() {
  const { data } = useQuery(GET_ALL_POSTS_MIDSECTION);

  console.log(data)

  return (
    <>
      <div className="home-blocks">
        <div className="left-posts">
          {data &&
            data.getAllPostsHome.map((post, i) => {
              return (
                <>
                  <div key={i} className={i < 4 ? "invisible" : "post"}>
                    <div>
                      <Link to={`/${post.slug}`}>
                        <div>
                          <img src={`/${post.thumb}`} alt={post.name} />
                        </div>
                      </Link>
                    </div>
                    <Link to={`/${post.slug}`} style={{ textDecoration: "none" }}>
                      <div className="post-name">{post.name}</div>
                    </Link>
                  </div>
                </>
              );
            })}
        </div>
        <div className="right-posts">
          {data &&
            data.getAllPostsHome.map((post, i) => {
              return (
                <>
                  <div key={i} className={i > 4 ? "invisible" : "post"}>
                    <div>
                      <Link to={`/${post.slug}`}>
                        <div>
                          <img src={`/${post.thumb}`} alt={post.name} />
                        </div>
                      </Link>
                    </div>
                    <Link to={`/${post.slug}`} style={{ textDecoration: "none" }}>
                      <div className="post-name">{post.name}</div>
                    </Link>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
