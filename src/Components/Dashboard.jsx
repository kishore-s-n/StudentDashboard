/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { CgWebsite } from "react-icons/cg";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedGithubUsername = localStorage.getItem("githubUsername");
    const storedLeetcodeUsername = localStorage.getItem("leetcodeUsername");

    if (storedGithubUsername && storedLeetcodeUsername) {
      setUsername(storedUsername);
      setGithubUsername(storedGithubUsername);
      setLeetcodeUsername(storedLeetcodeUsername);
      fetchGithubData(storedGithubUsername);
      fetchLeetcodeData(storedLeetcodeUsername);
    } else {
      setShowForm(true);
    }
  }, []);

  const fetchGithubData = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setGithubData(data);

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  const fetchLeetcodeData = async (username) => {
    try {
      const response = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${username}`
      );
      const data = await response.json();
      setLeetcodeData(data);
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("githubUsername");
    localStorage.removeItem("leetcodeUsername");
    setGithubUsername("");
    setLeetcodeUsername("");
    setGithubData(null);
    setLeetcodeData(null);
    setRepos([]);
    setShowForm(true);
  };

  return (
    <div className=''>
      {showForm ? (
        <UserForm />
      ) : (
        <div className='bg-black '>
          <div className='flex justify-between p-5 mx-5'>
            {" "}
            <h1 className='text-3xl font-bold mb-4 text-blue-500'>
              {username + "'s"} Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className='mb-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300'>
              Logout
            </button>
          </div>

          <div className='mb-4 '>
            <div className='flex justify-between items-center'>
              <div>
                <img
                  // src={githubData.avatar_url}
                  alt='Github profile pic'
                  className='mb-5 mx-5 h-20 w-20 rounded-full '
                />
              </div>
              <div className='p-5 flex gap-5'>
                <div>
                  <h2 className='text-xl text-white  font-semibold mb-2'>
                    GitHub Statistics
                  </h2>
                  {githubData && (
                    <div className='bg-slate-400 p-4 rounded-lg shadow-md'>
                      <p className='text-lg font-medium'>
                        Repositories: {githubData.public_repos}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className='text-xl text-white  font-semibold mb-2'>
                    LeetCode Statistics
                  </h2>
                  {leetcodeData && (
                    <div className='bg-slate-400 p-4 rounded-lg shadow-md'>
                      <p className='text-lg font-medium'>
                        Total Solved Problems: {leetcodeData.totalSolved}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {repos.length > 0 && (
              <div className='mt-4'>
                <h3 className='text-lg font-semibold mb-2'>Repositories</h3>
                <ul>
                  {repos.map((repo) => (
                    <li
                      key={repo.id}
                      className='m-5 px-5 py-2 bg-slate-600 rounded-lg shadow-md'>
                      <div>
                        <div className='flex justify-between'>
                          <h2 className='text-blue-500 font-bold text-xl'>
                            {repo.name}
                          </h2>
                          <a href={repo.html_url} className='text-2xl'>
                            <CgWebsite />
                          </a>
                        </div>
                        <p className='text-white'>
                          {repo.description || "No description"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
