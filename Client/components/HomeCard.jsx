import React from "react";

const Home = () => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        {/* Hero Section */}
        <section className="flex flex-col justify-center items-center text-center text-purple-700 mt-12">
          <div className="flex flex-col md:flex-row justify-between w-full my-12">
            <div className="flex-1 mr-5 mt-12">
              <h3 className="text-3xl font-extrabold text-violet-700 mb-2">
                Medi-Insight:
              </h3>
              <h1 className="text-5xl font-extrabold text-violet-800 mb-4">
                Take Charge of Your Health, Mind & Body
              </h1>
              <p className="text-gray-700 font-medium">
                Feeling under the weather and not sure what's wrong? Don't
                worry, Medi-Insight is here to be your friendly health
                detective!
              </p>
            </div>
            <div className="flex-1 mt-12 flex justify-center">
              <img
                src="/hero.png"
                alt="Hero"
                className="w-80 md:ml-24 -mt-12"
              />
            </div>
          </div>
        </section>
      </div>

      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 my-24 px-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md text-indigo-900 hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold mb-4">Symptom Analysis</h2>
          <p className="text-gray-600">
            Analyze your symptoms and get assistance powered by AI
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl shadow-md text-indigo-900 hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold mb-4">Image Prediction</h2>
          <p className="text-gray-600">
            Upload medical images and get AI-powered predictions and insights
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md text-indigo-900 hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold mb-4">AI Consult</h2>
          <p className="text-gray-600">
            Your AI Companion for Mental Wellness and guidance
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
