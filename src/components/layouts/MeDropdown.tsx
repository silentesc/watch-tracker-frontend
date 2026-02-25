import { useState, useRef, useEffect } from "react";
import type { Me } from "../../api/me"
import { logout } from "../../api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

interface MeDropdownProps {
    me: Me;
}

export function MeDropdown({ me }: MeDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const mutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/");
        }
    });

    const onLogout = () => {
        mutation.mutate();
    }

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={toggleDropdown}
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {me.username}
                <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                    <div className="py-1">
                        <a href="#account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account settings</a>
                        <a href="#support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Support</a>
                        <a href="#license" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">License</a>
                    </div>
                    <div className="py-1">
                        <button className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100" onClick={onLogout}>Sign out</button>
                    </div>
                </div>
            )}
        </div>
    );
}
