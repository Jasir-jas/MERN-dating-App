import React from 'react'
import style from "./Discover.module.css"
import { IoSearchOutline } from "react-icons/io5";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import ProfileCard from './ProfileCard';
import InterestBlock from './InterestBlock';
import AroundMe from './AroundMe';
import Footer from '../NavProfileView/FooterProfileView';
const Discover = () => {
  return (
    <div className={style.container}>
        <div className={style["nav-cont"]}>
            <select name="" id="">
                <option value="">Germany</option>
            </select>
            <div className={style.heading}>
                <h1>Discover</h1>
                <div className={style.search}>
                    <button><IoSearchOutline/></button>
                    <button><TbAdjustmentsHorizontal/></button>
                </div>
            </div>
        </div>
        <div className={style.contentblock}>
            <div className={style.discoverblock}>
                <ProfileCard tag={"New"} imageUrl={"./avatar2.jpg"} distance={"34"} name={"John"} age={"27"} location={"London"}/>
                <ProfileCard tag={"New"} imageUrl={"./avatar2.jpg"} distance={"34"} name={"John"} age={"27"} location={"London"}/>
                    <ProfileCard tag={"New"} imageUrl={"./avatar2.jpg"} distance={"34"} name={"John"} age={"27"} location={"London"}/>
                    <ProfileCard tag={"New"} imageUrl={"./avatar2.jpg"} distance={"34"} name={"John"} age={"27"} location={"London"}/>
                    <ProfileCard tag={"New"} imageUrl={"./avatar2.jpg"} distance={"34"} name={"John"} age={"27"} location={"London"}/>
                    <ProfileCard tag={"New"} imageUrl={"./avatar2.jpg"} distance={"34"} name={"John"} age={"27"} location={"London"}/>
                    <ProfileCard tag={"New"} imageUrl={"./avatar2.jpg"} distance={"34"} name={"John"} age={"27"} location={"London"}/>
                    <ProfileCard tag={"New"} imageUrl={"./avatar2.jpg"} distance={"34"} name={"John"} age={"27"} location={"London"}/>
            </div>
            <InterestBlock/>
            <AroundMe/>
        </div>
        <Footer/>
    </div>
  )
}

export default Discover