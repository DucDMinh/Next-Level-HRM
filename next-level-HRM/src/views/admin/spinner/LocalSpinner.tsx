import { FC } from "react";
import "./spinner.css";

const LocalSpinner: FC = () => (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-black/40 backdrop-blur-sm">
        <div className="fallback-spinner">
            <div className="loading component-loader">
                <div className="effect-1 effects" />
                <div className="effect-2 effects" />
                <div className="effect-3 effects" />
            </div>
        </div>
    </div>
);

export default LocalSpinner;