import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import Editor from "@monaco-editor/react";
import { IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { HiRefresh } from "react-icons/hi";
import { CiShare1 } from "react-icons/ci";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind ", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JAVASCRIPT" },
    {
      value: "html-tailwind-bootstrap",
      label: "HTML + Tailwind CSS + Bootstrap",
    },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFramework] = useState(options[0]);
  const [code, setCode] = useState("");
  const [Loading, setLoading] = useState(false);
  const [isTabOpen, setTabOpen] = useState(false);
  console.log(prompt);
  console.log(frameWork.value);

  function extractCode(response) {
    const match = response.match(/```[\s\S]*?\n([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  const downloadFile = () => {
    const fileName = "GenZUIcode.html";
    const blob = new Blob([code], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Code downloaded successfully!");
  };

  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAQ8Ntd-hOgpymFHUx405daNTuIvCaWtg4",
  });

  async function getResponse() {
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Act as a senior frontend engineer and UI/UX designer who builds modern, production-ready web components.

CRITICAL OUTPUT RULES (must follow strictly):
1. Always return a COMPLETE HTML document with <html>, <head>, and <body>.
2. Return ONLY the final code inside ONE Markdown fenced code block.
3. Do NOT include explanations, comments, apologies, or extra text outside the code block.

STYLING & FRAMEWORK RULES:
- If Tailwind CSS is used, you MUST include the official Tailwind CDN inside <head>.
- If Bootstrap is used, you MUST include Bootstrap CSS and Bootstrap JS CDN inside <head>.
- If plain HTML + CSS is used, include all CSS inside a <style> tag in <head>.
- Do NOT assume any external setup or build tools.
- The output MUST work directly when opened in a browser.

DESIGN & QUALITY REQUIREMENTS:
- Use modern UI/UX principles.
- Apply a clean color palette, gradients where suitable, and modern typography.
- Add smooth hover effects, subtle animations, and proper spacing.
- Ensure full responsiveness for mobile, tablet, and desktop.
- The component must look polished, stylish, and production-ready (not basic or raw HTML).

ACCESSIBILITY & STRUCTURE:
- Use semantic HTML elements where applicable.
- Maintain clean, readable, and well-structured code.
- Avoid unnecessary complexity.

USER REQUEST:
${prompt}

FRAMEWORK TO USE:
${frameWork.value}

Generate only the final UI component code.
`,
    });
    console.log(response.text);
    setCode(extractCode(response.text));
    setOutputScreen(true);
    setLoading(false);
  }

  const copyTest = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("failed to copy code.");
    }
  };

  const blackStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#000",
      borderColor: state.isFocused ? "#555" : "#333",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#555",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#000",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#333"
        : state.isFocused
          ? "#222"
          : "#000",
      color: "#fff",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#aaa",
    }),
    input: (base) => ({
      ...base,
      color: "#fff",
    }),
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center px-25 justify-between gap-5">
        <div className="left rounded-xl w-[50%] h-[auto] rounded-xl py-3  rounded-xl  bg-[#141319] mt-5 p-[20px]">
          <h3 className="text-[20px] font-semibold sp-text">
            Ai component Generator
          </h3>
          <p className="mt-4 pad text-[gray] text-[16px]">
            Descibe your compoent and let Ai generate it for you.
          </p>

          <p className="font-bold text-[15px] mt-4">Framework</p>

          <Select
            className="mt-2"
            // value={selectedOption}
            value={frameWork}
            onChange={setFramework}
            options={options}
            styles={blackStyles}
            placeholder="Select option"
          />
          <p className="font-bold text-2xl mt-5">Describe your component</p>
          <textarea
            placeholder="  Describe your component in detail and let ai will generate it for you"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="w-full min-h-[250px] bg-[#17171C] mt-3 rounded-xl  p-[10px]"
            id=""
          ></textarea>
          <div className="flex items-center mt-4">
            <button
              onClick={getResponse}
              className="generate flex items-center p-[15px] rounded-lg border-0 bg-gradient-to-r from bg-purple-400 to-purple-600  px-[20px] gap-10px cursor-pointer transition-all hover:opacity-[.8] "
            >
              {" "}
              <i>
                <BsStars />
              </i>
              {Loading ? (
                <>
                  <ClipLoader size={20} />
                </>
              ) : (
                ""
              )}
              Generate
            </button>
          </div>
        </div>
        <div className="right relative left w-[50%] h-[80vh] bg-[#141319] mt-5 ">
          {!outputScreen ? (
            <>
              <div className="skeleton w-full h-full flex items-center justify-center flex-col ">
                <div className="circle p-5 w-18 flex item-center justify-center text-3xl h-18 rounded-[50%] bg-gradient-to-r from bg-purple-400 to-purple-600   ">
                  <FaCode />
                </div>
                <p className="text-white mt-4">
                  Your Component & Code will appear here
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="top w-full h-[60px] bg-[#17171C] flex items-center gap-4 px-4">
                <button
                  className={
                    "btn w-[50%] p-3 rounded-xl cursor-pointer transition-all " +
                    (tab === 1 ? "bg-purple-500" : "")
                  }
                  onClick={() => setTab(1)}
                >
                  Code{" "}
                </button>
                <button
                  className={
                    "btn w-[50%] p-3 rounded-xl  cursor-pointer transition-all " +
                    (tab === 2 ? "bg-purple-500" : "")
                  }
                  onClick={() => setTab(2)}
                >
                  Review
                </button>
              </div>

              <div className="top-2  w-full h-[60px] bg-[#17171C] flex items-center justify-between gap-4 px-4">
                <div className="left">
                  {tab == 1 ? (
                    <>
                      <p className="font-bold">Code Editor</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold">Live Preview</p>
                    </>
                  )}
                </div>
                <div className="right flex items-center gap-2 ">
                  {tab == 1 ? (
                    <>
                      <button
                        className="copy h-10  rounded-xl border-[1px] border-zinc-800 flex items-center justify-center p-3 transition-all hover:bg-[#333]"
                        onClick={copyTest}
                      >
                        <IoCopy />
                      </button>
                      <button
                        className="export h-10 rounded-xl border-[1px] border-zinc-800 flex items-center justify-center p-3 transition-all hover:bg-[#333]"
                        onClick={downloadFile}
                      >
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="copy h-10  rounded-xl border-[1px] border-zinc-800 flex items-center justify-center p-3 transition-all hover:bg-[#333]"
                        onClick={() => setTabOpen(true)}
                      >
                        <CiShare1 />
                      </button>
                      <button className="export h-10 rounded-xl border-[1px] border-zinc-800 flex items-center justify-center p-3 transition-all hover:bg-[#333]">
                        <HiRefresh />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="editor  h-full ">
                {tab == 1 ? (
                  <>
                    <Editor
                      value={code}
                      onChange={(value) => setCode(value)}
                      height="100%"
                      theme="vs-dark"
                      language="html"
                    />
                    ;
                  </>
                ) : (
                  <>
                    <iframe
                      srcDoc={code}
                      className="preview w-full h-full bg-white text-black flex items-center justify-center"
                    ></iframe>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {isTabOpen ? (
        <>
          <div
            className="close absolute top-[100px] right-[100px] w-[50px] h-[50px] flex items-center justify-center rounded-[50%] bg-[#333] cursor-pointer"
            onClick={() => setTabOpen(false)}
          >
            <IoIosCloseCircle />
          </div>
          <iframe
            srcDoc={code}
            className="container absolute left-0 top-0 right-0 bottom-0 bg-white w-screen min-h-screen overflow-auto"
          ></iframe>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
