/* eslint-disable react/prop-types */
// import { useState } from "react";
import { CgWebsite } from "react-icons/cg";

const Repository = (props) => {
  // // const [commits, setCommits] = useState([]);
  // const [showCommits, setShowCommits] = useState(false);

  // const fetchCommits = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.github.com/repos/kishore-s-n/${props.repo.name}/commits`
  //     );
  //     const data = await response.json();
  //     setCommits(data);
  //   } catch (error) {
  //     console.error("Error fetching commits:", error);
  //   }
  // };

  // const toggleCommits = () => {
  //   if (!showCommits) {
  //     fetchCommits();
  //   }
  //   setShowCommits(!showCommits);
  // };

  return (
    <div>
      <div className='flex justify-between cursor-pointer'>
        <h2 className='text-blue-500 font-bold text-xl'>{props.repo.name}</h2>
        <a href={props.repo.html_url} className='text-2xl' target='_blank'>
          <CgWebsite />
        </a>
      </div>
      <p className='text-white'>{props.repo.description || "No description"}</p>
    </div>
  );
};

export default Repository;
