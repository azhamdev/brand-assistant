import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';
import Lottie from 'lottie-react';

import CopyImg from './assets/copy.png'

import LoadingAnimation from './assets/man-writing.json'

function App() {
  const [ide, setIde] = useState("")
  const [hasil, setHasil] = useState("")
  const [loading, setLoading] = useState(false)

  const config = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI
  })

  const openai = new OpenAIApi(config)

  const cariIde = async (e) => {
    setLoading(true)
    e.preventDefault();
    const tulisanAI = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `buatkan narasi branding untuk produk ${ide} dan hastagh yang relevan`,
      temperature: 0.5,
      max_tokens: 1000
    })
    setHasil(tulisanAI.data.choices[0].text);
    setLoading(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(hasil);
    alert('Text Berhasil dicopy')

  }

  const ButtonCopy = () => {
    return (
      <>
        <button className='btn btn-copy' onClick={copy}>
          <img className='copy-img' src={CopyImg} />
        </button>
      </>
    )
  }

  return (
    <>
      <div className='container mt-5'>
        <div className="wrapper">
          <h1 className='heading'>PRODUCT BRANDING ASSISTANT <span>beta</span></h1>
          <p className='subheadline'>Temukan ide brandingmu dengan bantuan Artificial Intelligence</p>
          <form className='mt-5' onSubmit={cariIde}>
            <p className='example-text'>Tulis jenis produkmu</p>
            <input
              className='form-control input-produk'
              type='text'
              placeholder='Kopi Gayo Aceh'
              onChange={(e) => setIde(e.target.value)}
            />
            <br></br>
            <button className='btn btn-primary btn-submit'>Cari ide</button>
          </form>
          <div>
            <h2 className='mb-4 mt-4 hasil-title'>Ide dari si assistant</h2>
            <ButtonCopy />
          </div>
          {
            loading ? (
              <div className="loader-container">
                <p>lagi dibikinin, sabar ya</p>
                <Lottie className='animasi' animationData={LoadingAnimation} loop={true} />
              </div>
            ) : (
              <p className='hasil-text'>{hasil}</p>
            )
          }
        </div>
        <div className=' mt-5'>
          <center>
            <h6 className='copyright'>© Azham A. Rasyid</h6>
          </center>
        </div>
      </div>

    </>
  );
}

export default App;
