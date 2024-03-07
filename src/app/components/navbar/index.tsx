"use client"
import { usePolkadot } from "@/src/context"
import { truncateWalletAddress } from "@/src/utils"
import Image from "next/image"
import React from "react"
import Ticker from '../ticker';
import Link from 'next/link';
import classnames from 'classnames';

import {
  FaDiscord,
  FaGithub,
  FaSpinner,
  FaTelegram,
  FaTwitter,
  FaWallet,
  FaYoutube,

} from "react-icons/fa"
import { TbCubePlus } from "react-icons/tb";
import { MdOutlineTravelExplore } from "react-icons/md";

const Navbar = () => {
  const { isInitialized, handleConnect, isConnected, selectedAccount } = usePolkadot()

  return (
    <>
      <div className="container">
        <div className="navbar bg-transparent justify-between p-0">
          <div className="flex gap-x-3">
            <Link href="https://www.comhub.app/">
              <button className="btn btn-ghost text-xl">
                <Image
                  width={45}
                  height={45}
                  // onClick={handleConnect}
                  className="cursor-pointer"
                  alt="ComHub - the hub for commune ai modules"
                  src="/images/comai-logo.png"
                />
              </button>
            </Link>

            <p>socials</p>
            <Link href="https://discord.gg/communeai" target="_blank">
              <button className="btn btn-ghost p-1"><FaDiscord size={30} /></button>
            </Link>

            <Link href="https://twitter.com/communeaidotorg" target="_blank">
              <button className="btn btn-ghost p-1"><FaTwitter size={30} /></button>
            </Link>
            <Link href="https://t.me/communecommunity" target="_blank">
              <button className="btn btn-ghost p-1"><FaTelegram size={30} /></button>
            </Link>

            <Link href="https://www.youtube.com/@omnipotentlabs" target="_blank">
              <button className="btn btn-ghost p-1"><FaYoutube size={30} /></button>
            </Link>


          </div>
          {/* <CMCWidget/> */}
          <Ticker />

          <div className="flex gap-x-3">
            <Link href="https://github.com/commune-ai/comhub-app" target="_blank">
              <button className="btn btn-ghost p-2"><FaGithub size={30} /></button>
            </Link>
            {/* <input
            type="text"
            placeholder="Search Modules"
            className="input input-bordered min-w-80"
          /> */}
            <div className="relative">
              <input
                type="text"
                placeholder="Module search coming soon..."
                className="input input-bordered min-w-80 pr-10" // Add padding to the right to make space for the plus button
                disabled={true}
              />
              {/* <button className="absolute right-2 top-1/2 transform -translate-y-1/2">+</button> */}
              <Link href="https://github.com/luxejs/comhub-app/issues/new?assignees=&labels=&projects=&template=request-commune-ai-module-to-be-added-to-comhub-app.md&title=%5BMODULE+REQUEST%5D" target='_blank'>
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-ghost text-xl"><TbCubePlus /></button>
              </Link>

            </div>

            <Link href="https://explorer.comwallet.io/" target='_blank'>
                <button className="btn btn-ghost p-2  hover:text-orange-400"><MdOutlineTravelExplore size={28} /></button>
              </Link>
              {!isInitialized && <FaSpinner className="spinner" />}
            {isInitialized && (
              <>
                {selectedAccount ? (
                  <div className="relative flex items-center rounded-full shadow py-2">
                    <button className="flex items-center cursor-pointer">
                      <FaWallet size={24} className="text-purple" />
                      <span className="ml-2 font-mono">
                        {truncateWalletAddress(selectedAccount.address)}
                      </span>
                    </button>
                  </div>
                ) : (
                  <button onClick={handleConnect} disabled={!isInitialized} className="btn btn-ghost text-xl">
                    <Image
                      width={35}
                      height={35}
                      className="cursor-pointer"
                      alt="Tailwind CSS Navbar component"
                      src="https://avatars.githubusercontent.com/u/33775474?s=200&v=4"
                    />
                    <span><p>connect</p></span>

                  </button>
                )}
              </>
            )}
            
          </div>

        </div>


      </div>
        <div className={classnames('divider justify-center flex', {
          'divider-warning': isInitialized && isConnected,
          'divider-accent': isInitialized && !isConnected,
          'divider-neutral': !isInitialized
        })}>

{/*  */}
          <Link className="transition duration-300 ease-in-out hover:scale-150 z-50" href="https://www.communeai.org/" target="_blank"><p>powered by
            <Image
              width={60}
              height={60}
              className="cursor-pointer relative ml-4"
              alt="ComHub - the hub for commune ai modules"
              src="/images/comai-webp.webp"
              unoptimized
              
            />
          </p></Link>
        </div>
      </>
      )
}

      export default Navbar
