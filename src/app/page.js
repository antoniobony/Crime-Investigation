"use client"
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [suspect] = useState(["antonio", "romario", "bony", "bruno", "sophie"]);
  const [crimeTypes] = useState(["vol", "assassinat", "escroquerie"]);
  const [selectedSuspect, setSelectedSuspect] = useState("antonio");
  const [selectedCrime, setSelectedCrime] = useState("vol");
  const [clickedSuspect, setClickedSuspect] = useState(null);
  const [clickedCrime, setClickedCrime] = useState(null);
  const [result, setResult] = useState(null);
  const [showProofs, setShowProofs] = useState(false);
  
  const [facts] = useState({
    has_motive: {
      antonio: ["vol"],
      romario: ["assassinat"],
      bony: ["escroquerie"],
    },
    was_near_crime_scene: {
      antonio: ["vol"],
      romario: ["assassinat"],
    },
    has_fingerprint_on_weapon: {
      antonio: ["vol"],
      romario: ["assassinat"],
    },
    has_bank_transaction: {
      bony: ["escroquerie"],
      bruno: ["escroquerie"],
    },
    owns_fake_identity: {
      sophie: ["escroquerie"],
    },
  });

  const hideProofs = () => {
    setShowProofs(false);
  };

  const checkGuilt = () => {
    const guilty = isGuilty(selectedSuspect, selectedCrime);
    setResult(guilty);
    setClickedSuspect(selectedSuspect);
    setClickedCrime(selectedCrime);
    setShowProofs(true);
  };

  const isGuilty = (suspect, crime) => {
    let guilty = false;
    if (crime === "vol") {
      guilty =
        facts.has_motive[suspect]?.includes(crime) &&
        facts.was_near_crime_scene[suspect]?.includes(crime) &&
        facts.has_fingerprint_on_weapon[suspect]?.includes(crime);
    } else if (crime === "assassinat") {
      guilty =
        facts.has_motive[suspect]?.includes(crime) &&
        facts.was_near_crime_scene[suspect]?.includes(crime) &&
        (facts.has_fingerprint_on_weapon[suspect]?.includes(crime) || false);
    } else if (crime === "escroquerie") {
      guilty =
        (facts.has_bank_transaction[suspect]?.includes(crime) ||
          facts.owns_fake_identity[suspect]?.includes(crime)) &&
        facts.has_motive[suspect]?.includes(crime);
    }
    return guilty;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="flex flex-row justify-center">
          <Image src="/assets/ia.gif" width={80} height={80} alt="iAPicture"/>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Criminal Detection System</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Choose a Suspect</label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700 capitalize"
                  value={selectedSuspect}
                  onChange={(e) => {
                    setSelectedSuspect(e.target.value);
                    hideProofs();
                  }}
                >
                  {suspect.map((sus) => (
                    <option key={sus} value={sus} className="capitalize">
                      {sus}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Choose a Crime Type</label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700 capitalize"
                  value={selectedCrime}
                  onChange={(e) => {
                    setSelectedCrime(e.target.value);
                    hideProofs();
                  }}
                >
                  {crimeTypes.map((crime) => (
                    <option key={crime} value={crime} className="capitalize">
                      {crime}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 font-medium cursor-pointer"
              onClick={checkGuilt}
            >
              Check Guilt
            </button>

            {showProofs && (
              <div className={`p-4 rounded-lg ${result ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                <h3 className="font-semibold text-gray-800">Result: {result ? "Guilty" : "Not Guilty"}</h3>
              </div>
            )}

            {showProofs && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Proofs for {clickedSuspect.charAt(0).toUpperCase() + clickedSuspect.slice(1)} ({clickedCrime.charAt(0).toUpperCase() + clickedCrime.slice(1)})</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {clickedCrime === "vol" && (
                    <>
                      <li>Motive: {facts.has_motive[clickedSuspect]?.includes('vol') ? 'Yes' : 'No'}</li>
                      <li>Near Crime Scene: {facts.was_near_crime_scene[clickedSuspect]?.includes('vol') ? 'Yes' : 'No'}</li>
                      <li>Fingerprints on Weapon: {facts.has_fingerprint_on_weapon[clickedSuspect]?.includes('vol') ? 'Yes' : 'No'}</li>
                    </>
                  )}
                  {clickedCrime === "assassinat" && (
                    <>
                      <li>Motive: {facts.has_motive[clickedSuspect]?.includes('assassinat') ? 'Yes' : 'No'}</li>
                      <li>Near Crime Scene: {facts.was_near_crime_scene[clickedSuspect]?.includes('assassinat') ? 'Yes' : 'No'}</li>
                      <li>Fingerprints on Weapon: {facts.has_fingerprint_on_weapon[clickedSuspect]?.includes('assassinat') ? 'Yes' : 'No'}</li>
                    </>
                  )}
                  {clickedCrime === "escroquerie" && (
                    <>
                      <li>Motive: {facts.has_motive[clickedSuspect]?.includes('escroquerie') ? 'Yes' : 'No'}</li>
                      <li>Bank Transactions: {facts.has_bank_transaction[clickedSuspect]?.includes('escroquerie') ? 'Yes' : 'No'}</li>
                      <li>Fake Identity: {facts.owns_fake_identity[clickedSuspect]?.includes('escroquerie') ? 'Yes' : 'No'}</li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Rules of Culpability</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">Vol:</span> Motive + Presence + Fingerprint</li>
                <li><span className="font-medium">Assassinat:</span> Motive + Presence + (Fingerprint or Eyewitness)</li>
                <li><span className="font-medium">Escroquerie:</span> Motive + (Bank Transaction or Fake Identity)</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Group Members (M1 IG Group 1)</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">1268 H-F</span> RANDRIANARIVO Marius Narcisse</li>
                <li><span className="font-medium">1186 H-F</span> RAKOTONIRINA Rado Leonce</li>
                <li><span className="font-medium">1287 H-F</span> RAZAFIMIANDRISOARIVONY Onjanirina Théodose Lyoncia</li>
                <li><span className="font-medium">1178 H-F</span> ANDRIANIRINA Romario Richard</li>
                <li><span className="font-medium">1181 H-F</span> MIARINARIVONIRINA Manoela Jhonson</li>
                <li><span className="font-medium">1191 H-F</span> RANDRIAMAMPIONONA Joharivola</li>
                <li><span className="font-medium">1247 H-F</span> BAKARY Kodahy Antonio</li>
                <li><span className="font-medium">1218 H-F</span> RAKOTONINDRINA Narindranjanahary</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}