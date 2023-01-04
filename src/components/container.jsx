import React, { useEffect, useState } from 'react';
import "./container.css";

import { MdOutlineContentCopy } from "react-icons/md";

import { BiErrorCircle } from "react-icons/bi";
import { BsExclamationTriangle } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";

import Swal from 'sweetalert2';


let lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let upercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let symbols = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", ":", ";", "<", "=", ">", "?", "@"];

function Container() {


    const [len, setlen] = useState(10);
    const [lower, setlower] = useState(true);
    const [upper, setupper] = useState(true);
    const [number, setnumber] = useState(false);
    const [symbol, setsymbol] = useState(true);
    const [pass, setpass] = useState("");
    const [crack, setcrack] = useState("");
    const [icon, seticon] = useState(<BiErrorCircle />);
    const [crackclass, setcrackclass] = useState(" ");

    useEffect(() => {
        generate();
    }, [len, lower, upper, number, symbol])

    useEffect(() => {
        if (len < 2) {
            setcrack("1 second")
            seticon(<BiErrorCircle />)
            setcrackclass("error")
        }
        else if (len < 3) {
            setcrack("10 second")
            seticon(<BiErrorCircle />)
            setcrackclass("error")
        }
        else if (len < 4) {
            setcrack("2 minutes")
            seticon(<BiErrorCircle />)
            setcrackclass("error")
        }
        else if (len < 5) {
            setcrack("17 minutes")
            seticon(<BsExclamationTriangle />)
            setcrackclass("dunger")
        }
        else if (len < 6) {
            setcrack("3 hours")
            seticon(<BsExclamationTriangle />)
            setcrackclass("dunger")
        }
        else if (len < 7) {
            setcrack("1 day")
            seticon(<BsExclamationTriangle />)
            setcrackclass("dunger")
        }
        else if (len < 8) {
            setcrack("12 days")
            seticon(<AiOutlineInfoCircle />)
            setcrackclass("info")
        }
        else if (len < 9) {
            setcrack("4 months")
            seticon(<AiOutlineInfoCircle />)
            setcrackclass("info")
        }
        else if (len < 10) {
            setcrack("3 years")
            seticon(<AiOutlineCheckCircle />)
            setcrackclass("succes")
        }
        else if (len < 11) {
            setcrack("31 years")
            seticon(<AiOutlineCheckCircle />)
            setcrackclass("succes")
        }
        else {
            setcrack("centuries")
            seticon(<AiOutlineCheckCircle />)
            setcrackclass("succes")
        }
    }, [len])

    function generate() {
        if (lower !== false || upper !== false || number !== false || symbol !== false) {
            let a = [];
            if (lower === true) a.push(lowercase);
            if (upper === true) a.push(upercase);
            if (number === true) a.push(numbers);
            if (symbol === true) a.push(symbols);

            let pwt = ""
            for (let i = 0; i < len; i++) {
                let r = a[Math.floor(Math.random() * a.length)]
                for (let j = 0; j < 1; j++) {
                    pwt += r[Math.floor(Math.random() * r.length)];
                }
            }
            setpass(pwt);
        } else {
            Swal.fire(
                'oops',
                'you can\'t generate password :)',
                'error'
            )
        }
    }

    function handlelen(e) {
        setlen(e.target.value);
    }
    function toggle(value) {
        return !value;
    }

    function handlebutton(e) {
        generate()
    }

    function copy(e) {
        navigator.clipboard.writeText(pass)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Password copied successfully',
            showConfirmButton: false,
            timer: 1200
        })
    }

    return (
        <div className='container'>
            <div className='child'>
                <h1>Password generator</h1>
                <div className='divinpt1'>
                    <button onClick={copy}>
                        <input type="text" value={pass} readOnly />
                        <MdOutlineContentCopy className='copy' />
                    </button>
                </div>
                <h3 className={"crack " + crackclass}>
                    <span>{icon}</span>
                    your password cracked in {crack}
                </h3>

                <div className='range'>
                    <p>Password length: {len}</p>
                    <input type="range" min="1" max="30" value={len} onChange={handlelen} />
                </div>
                <div className='checks'>
                    <div>
                        <input type="checkbox" name='chbox1' checked={lower} onChange={() => setlower(toggle)} />
                        <label htmlFor="chbox1">lowercase</label>
                    </div>

                    <div>
                        <input type="checkbox" name='chbox2' checked={upper} onChange={() => setupper(toggle)} />
                        <label htmlFor="">uppercase</label>
                    </div>

                    <div>
                        <input type="checkbox" name='chbox3' checked={number} onChange={() => setnumber(toggle)} />
                        <label htmlFor="">numbers</label>
                    </div>

                    <div>
                        <input type="checkbox" name='chbox4' checked={symbol} onChange={() => setsymbol(toggle)} />
                        <label htmlFor="">symbols</label>
                    </div>
                </div>
                <div className='gnrt' onClick={handlebutton}>
                    <button>generate password</button>
                </div>

            </div>
        </div>
    )
}

export default Container;