"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import { Page, Pages } from "./Pages";
import { generalColors, generalStyles } from "./generalStyles";
import { useRef } from "react";
import {
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import Link from "next/link";

const NavBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        setIsOverflowing(
          containerRef.current.scrollWidth > containerRef.current.clientWidth
        );
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  useEffect(() => {
    const currentPage = Pages.find((page) => page.path === window.location.pathname);
    if (currentPage) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(Pages[0]);
    }
  }, []);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="xl" className="flex items-center">
        {isOverflowing && (
          <IconButton
            onClick={scrollLeft}
            sx={{ position: "absolute", left: 0, zIndex: 1 }}
          >
            <ArrowBackIos sx={{ color: generalColors.white }} />
          </IconButton>
        )}
        <div
          ref={containerRef}
          className="flex justify-evenly overflow-auto scroll-smooth flex-grow scrollbar-hide px-5 max-w-full"
        >
          {Pages.map((page) => (
            <Link key={page.name} href={page.path} passHref>
              <Button
                key={page.name}
                sx={{
                  ...generalStyles.NavBar.button,
                  minWidth: "100px",
                  borderBottom:
                    currentPage?.name === page.name
                      ? `2px solid ${generalColors.white}`
                      : "none",
                }}
                onClick={() => setCurrentPage(page)}
              >
                {page.name}
              </Button>
            </Link>
          ))}
        </div>
        {isOverflowing && (
          <IconButton
            onClick={scrollRight}
            sx={{ position: "absolute", right: 0, zIndex: 1 }}
          >
            <ArrowForwardIos sx={{ color: generalColors.white }} />
          </IconButton>
        )}
      </Container>
    </AppBar>
  );
};

export default NavBar;
