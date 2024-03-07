"use client"

import Image from "next/image"
import React, { useState } from 'react';
import Link from "next/link"
import { usePolkadot } from "@/src/context"
import { MdVerified } from "react-icons/md";

import classnames from 'classnames';

interface ModuleCardInterface {
  url: string
  name: string
  image: string
  description: string
  validatorKey: string
  verified: boolean
  tags: string[],
  disabled: boolean
}
const ModuleCard = ({ url, name, image, description, validatorKey, verified, tags, disabled }: ModuleCardInterface) => {
  const { isInitialized, isConnected, addStake, removeStake } = usePolkadot()
  const [selectedAmount, setSelectedAmount] = useState('1'); // Default selected value

  const handleAmountChange = (event: any) => {
    setSelectedAmount(event.target.value)
  }

  return (
    <>
      <div className="card card-compact w-96 bg-base-100 shadow-xl m-4">
        <div className="mockup-browser border bg-base-300 h-full">
          <div className="mockup-browser-toolbar">
            <Link href={url} target="_blank" className="input">
              <u>{url}</u>
            </Link>
          </div>
          <Link href={url} target="_blank">

            <div className="justify-center card-title">{name}
              <div className="tooltip tooltip-top" data-tip="verified">
                <MdVerified className={`${!verified ? 'hidden' : verified && name === 'ComHub' ? 'text-yellow-500' : 'text-blue-500'}`} />
              </div>
            </div>
            <div className="flex justify-center px-4 py-16 bg-base-200">
              <div className="relative min-h-40 min-w-40">
                <Image fill src={image} alt="module-image" />
              </div>
            </div>
          </Link>

          <div className="card-body py-0">
            <div className="flex gap-2">


              {tags.map((tag) => (
                <div key={tag} className={classnames('badge', 'badge-outline', {
                  'badge-accent': tag === 'stats',
                  'badge-primary': tag === 'staking',
                  'badge-info': tag === 'bridge',
                  'badge-secondary': tag === 'wallet',
                  'badge-success': tag === 'chat' || tag === 'GPT' || tag === 'events' || tag === 'guide',
                  'badge-warning': tag === "hub",
                  'badge-error': tag === "new",
                  'badge-default': tag === 'com' || tag === 'coming soon' || tag === 'Ai'
                })}>{tag}</div>
              ))}

            </div>

            <div role="alert" className="alert">

              <div className="card-text font-500">
                {description}
              </div>

            </div>
            {/* <div className="divider divider-neutral mt-4 mb-0">stake </div> */}
            <div className={classnames('divider justify-center flex mt-4 mb-0', {
              'divider-neutral': !isInitialized || disabled,
              'divider-accent': isInitialized && !isConnected,
              'divider-warning': isInitialized && isConnected

            })}>stake</div>
            <p className="text-xs text-slate-600">{validatorKey}</p>
            <div className="card-actions justify-center mt-4">
              <select
                disabled={!isConnected || disabled}
                className="select select-bordered w-full"
                value={selectedAmount}
                onChange={handleAmountChange}
              >
                {/* <option disabled selected>{`${isConnected ? 'select $COMAI amount' : 'connect to select $COMAI amount'}`}</option> */}
                <option value="1">1 $COMAI</option>
                <option value="10">10 $COMAI</option>
                <option value="100">100 $COMAI</option>
                <option value="1000">1,000 $COMAI</option>
                <option value="10000">10,000 $COMAI</option>
                <option value="100000">100,000 $COMAI</option>
                <option value="1000000">1,000,000 $COMAI</option>

              </select>
              <div className="flex flex-col w-full lg:flex-row justify-center">
                <div className="grid flex-grow h-12 card bg-base-300 rounded-box place-items-center">
                  {<button disabled={!isConnected || disabled} onClick={() => { addStake({ validator: validatorKey, amount: String(selectedAmount) }) }} className="btn btn-primary w-full" >{isConnected ? 'stake' : 'connect to stake'}</button>}
                </div>
                <div className="divider lg:divider-horizontal py-0">or</div>

                <div className="grid flex-grow h-12 card bg-base-300 rounded-box place-items-center">
                  {<button disabled={!isConnected || disabled} onClick={() => { removeStake({ validator: validatorKey, amount: String(selectedAmount) }) }} className="btn btn-error w-full" >{isConnected ? 'unstake' : 'connect to unstake'}</button>}
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModuleCard
