import { FiHome, FiUsers, FiLock } from "react-icons/fi";
import {
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowUp,
    MdEventNote,
    MdPostAdd,
    MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { CgCircleci } from "react-icons/cg";
import { RxCube, RxLightningBolt } from "react-icons/rx";
import { HiComputerDesktop, HiOutlineDocument } from "react-icons/hi2";
import { RiTableLine, RiPieChartLine, RiPagesLine } from "react-icons/ri";
import { SiDatabricks } from "react-icons/si";
import { AiOutlineDrag, AiFillAppstore } from "react-icons/ai";
import { GoFileDirectory } from "react-icons/go";
import { GrCompliance } from "react-icons/gr";

export {
    FiHome,
    FiUsers,
    RiTableLine,
    RiPieChartLine,
    SiDatabricks,
    AiOutlineDrag,
    AiFillAppstore,
    GoFileDirectory,
    FiLock,
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowUp,
    MdEventNote,
    CgCircleci,
    RxCube,
    RxLightningBolt,
    HiComputerDesktop,
    HiOutlineDocument,
    RiPagesLine,
    MdPostAdd,
    MdOutlineKeyboardArrowDown,
    GrCompliance,
    DoneICon,
};

function DoneICon({ size }: { size: number | string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1 17C1 8.16345 8.16345 1 17 1C25.8366 1 33 8.16345 33 17C33 25.8366 25.8366 33 17 33C8.16345 33 1 25.8366 1 17Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.88867 17.0009L15.222 22.3342L24.1109 13.4453"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
