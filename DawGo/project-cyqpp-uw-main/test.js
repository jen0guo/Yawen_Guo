import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "./src/App";
import Footer from "./src/footer"
import Support from "./src/supportPage";
import { Banner, NavBar } from "./src/navbar/navbar";
import { CATEGORIES } from "./src/data";
import HomePage from "./src/homePage";
import { CardDeck } from "./src/cardDeck";
import SearchBar from "./src/searchBar";


import { getDatabase, connectDatabaseEmulator } from "firebase/database";
const db = getDatabase();
if (window.location.hostname === "localhost") {
 //can only run this once per "instance" though??
 connectDatabaseEmulator(db, "localhost", 9000); //use emulator
}

describe('test app', () => {
    test('render without errors', () => {
        render(<App />);
        expect(screen.getByText('Save Money & Save the Earth')).toBeInTheDocument();
        expect(screen.getByRole('a')).toBeInTheDocument();
    })
})

describe('test footer', () => {
    test('render without errors', () => {
        render(<Footer />);
        expect(screen.getByText('2022 DawGo. All Rights Reserved.')).toBeInTheDocument();
    })
})

describe('test support page', () => {
    test('render without errors', () => {
        render(<Support/>);
        userEvent.click(screen.getByText('What are the shipping options?'))
    })
})

describe('test navbar', () => {
    test('render navbar without errors', () => {
        render(<NavBar/>);
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        // expect(screen.getByRole('Logo')).toBeDefined()
        // expect(screen.getByRole('NewsLine')).toBeDefined()
        // expect(screen.getByRole('NavLinks')).toBeDefined()
    })

    test('render banner without errors', () => {
        render(<Banner/>);
        expect(screen.getByRole('heading')).toBeInTheDocument();
    })
})


const mockCardDeck = jest.fn();
jest.mock("./src/cardDeck", () => (props) => {
    mockCardDeck(props);
    return <mock-CardDeck/>;
})
const mockHomePage = jest.fn();
jest.mock("./src/homePage", () => (props) => {
    mockHomePage(props);
    return <mock-homePage/>;
})

const mockCategories = jest.fn();
jest.mock("./src/categories", () => (props) => {
    mockCategories(props);
    return <mock-Categories/>;
})



describe("test homepage", () => {
    test('render homepage without errors', () => {
        render(<HomePage/>);
        expect(screen.getByTestId('homepage_body')).toBeInTheDocument();
    })
})

describe("test mock homepage", () => {
    test('render mock Homepage', () => {
        expect(mockHomePage).toHaveBeenCalled();
    })

    test('render mock Categories', () => {
        expect(mockCategories).toBeDefined();
    })

    test('render mock CardDeck', () => {
        expect(mockCardDeck).toBeDefined();
    })
})


describe("test cards", () => {
    test("render without errors", () => {
        render(<card/>)
        expect(screen.getByTestId("card")).toBeDefined()
    })
})

describe("test cardDeck", () => {
    test("render without errors", () => {
        render(<CardDeck/>)
        expect(screen.getByTestId("cardDeck")).toBeDefined()
    })
})

describe("test searchBar", () => {
    test("render without errors", () => {
        render(<SearchBar/>)
        expect(screen.getByTestId("searchBar")).toBeInTheDocument()
    })
})