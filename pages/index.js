import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [content, setContent] = useState("");
  const [spellCheckData, setSpellCheckData] = useState([]);
  const [spellErr, setSpellErr] = useState(false);

  /**
   *
   *
   * Fetch Spell Errors and Suggestions
   */
  const fetchSpellErrSugg = async () => {
    try {
      const res = await axios.post(`/api/check`, {
        content,
      });
      const { data } = res;

      if (data.spellingErrorCount === 0) {
        setSpellErr(false);
      }
      {
        const { elements } = data;
        setSpellCheckData(elements[0].errors);
        setSpellErr(true);
      }
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="flex flex-col items-center relative min-h-screen">
      <div>
        <h2 className="font-raleway font-bold text-6xl text-primary pt-20 pb-6 md:text-3xl">
          Spell Checker App
        </h2>
      </div>

      <div className="flex justify-center w-full h-96 mt-8 mb-8 md:flex-col md:items-center md:justify-start">
        <textarea
          type="text"
          className="border border-primary outline-none w-2/5 px-4 py-2 rounded-sm font-raleway md:w-full"
          placeholder="Write/paste any content..."
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex items-center mb-8 ">
        <button
          className="h-1/6 border-r-4 outline-none border border-active font-bold font-raleway mx-12 px-12 rounded-sm bg-active text-primary transition duration-300 hover:bg-bc hover:text-black hover:border-primary md:h-16 md:my-12"
          onClick={fetchSpellErrSugg}
        >
          Check
        </button>
      </div>
      <div>
        {spellErr ? (
          <div className=" w-full flex display-center md:w-full mb-16">
            <table className="bg-white w-full text-primary border-danger border md:text-sm md:mx-2">
              <tr>
                <th className="border-danger border text-left px-4 py-4">
                  Word
                </th>
                <th className="border-danger border text-left px-4 py-4">
                  Suggestions
                </th>
              </tr>
              <tbody>
                {spellCheckData.map((obj) => {
                  return (
                    <tr key={spellCheckData.indexOf(obj)}>
                      <td className="border-danger border px-4 py-4">
                        {obj.word}
                      </td>
                      <td className="border-danger border px-4 py-4">
                        {`${obj.suggestions[0]}, ${obj.suggestions[1]}, ${obj.suggestions[2]}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="font-raleway font-bold text-3xl text-secondary pt-20 pb-6 md:text-3xl">
            No Spelling Error.{" "}
          </h2>
        )}
      </div>
    </div>
  );
}
