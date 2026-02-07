interface LogoProps {
    width?: number;
    height?: number;
}

function Logo({ width = 64, height = 64 }: LogoProps) {
    return (
        <img src="/logo.svg" alt="Logo" style={{ width: `${width}px`, height: `${height}px` }} />
    );
}

export default Logo;
