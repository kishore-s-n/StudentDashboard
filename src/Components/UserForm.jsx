import { useState } from "react";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("githubUsername", githubUsername);
    localStorage.setItem("leetcodeUsername", leetcodeUsername);
    alert("Usernames saved to local storage!");
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold mb-4'>Enter Usernames</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='github'
              className='block text-gray-700 font-medium mb-2'>
              Username
            </label>
            <input
              type='text'
              id='github'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded-lg'
              placeholder='Enter your Name'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='github'
              className='block text-gray-700 font-medium mb-2'>
              GitHub Username
            </label>
            <input
              type='text'
              id='github'
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded-lg'
              placeholder='Enter your GitHub username'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='leetcode'
              className='block text-gray-700 font-medium mb-2'>
              LeetCode Username
            </label>
            <input
              type='text'
              id='leetcode'
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded-lg'
              placeholder='Enter your LeetCode username'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
