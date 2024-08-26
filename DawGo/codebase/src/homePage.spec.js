import React from "react";
import "@testing-library/jest-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";

import { NavBar } from "./navbar/navbar";
import SearchBar from "./searchBar";
import HomePage from "./homePage";
import { PageNavigator } from "./homePage"
import { ALL_ITEMS, CATEGORIES, DEFAULT_ITEM } from "./data";
import { Card } from "./card.js"
import Footer from "./footer";
import Categories from "./categories";
import NavLinks from "./navbar/navlinks";

describe("Test Homepage Header", () => {
    test('Render navigation bar without errors', () => {
        render(
            <Router>
                <NavBar/>
            </Router>
        );
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
    })

    test("Link to support page works", async () => {
        render(
            <Router>
                <NavLinks/>
            </Router>
        );
        screen.getAllByRole("link").map((element) => {
            return expect(element).toBeEnabled();
        })

        let promise = fireEvent.click(screen.getByTestId("link_to_support_page"))
        let element = await promise
        
        expect(screen.getByTestId("support_slogan")).toBeInTheDocument();
        // pass the test but red line
        // expect(waitFor(() => getByTestId("support_slogan"))).resolves.toBeInTheDocument();
    })

    test("Render search bar on homepage", () => {
        render(<SearchBar/>)
        expect(screen.getByTestId("searchBar")).toBeInTheDocument()
    })

    test("Receive typed-in text from search bar", () => {
        render(<SearchBar/>)

        userEvent.type(screen.getByTestId("searchBar"), "Airpods")
        expect(screen.getByRole("searchbox")).toHaveValue("Airpods")
    })
})


describe("Test Homepage Body", () => {
    test("Render homepage without errors", () => {
        render(
            <Router>
                <HomePage
                    allItems={[]}
                    categoryList={[]}
                    handleSavedItemsChange={jest.fn()}
                    handleAlertChange={jest.fn()}
                    selectedCategories={[]}
                    handleSelectCategories={jest.fn()}
                />
            </Router>
        );
        expect(screen.getByTestId("homepage_body")).toBeInTheDocument();
        expect(screen.getByTestId("Categories")).toBeInTheDocument();
        expect(screen.getByTestId("CardDeck")).toBeInTheDocument();
        expect(screen.getByTestId("PageNavigator")).toBeInTheDocument();
        expect(screen.getByTestId("previous_btn")).toBeInTheDocument();
        expect(screen.getByTestId("next_btn")).toBeInTheDocument();
    })

    test("Render all item cards", () => {
        render(
            <Router>
                <HomePage
                    allItems={[ALL_ITEMS]}
                    categoryList={[]}
                    handleSavedItemsChange={jest.fn()}
                    handleAlertChange={jest.fn()}
                    selectedCategories={[]}
                    handleSelectCategories={jest.fn()}
                />
            </Router>
        );
        expect(screen.getByTestId("item_card")).toBeInTheDocument();
        expect(screen.getByTestId("item_image")).toHaveAccessibleName()
    })


    test("Item cards on homepage have buttons", () => {
        let showButtons = true;
        render(
            <Router>
                <Card
                    data={DEFAULT_ITEM}
                    handleSavedItemsChange={jest.fn()}
                    handleAlertChange={jest.fn()}
                    showButtons={showButtons}
                />
            </Router>
        )
        expect(screen.getByTestId("save_item_btn")).toBeInTheDocument();
    })

    test("Save item after clicking button", () => {
        let handleAlertChange = jest.fn();
        let handleSavedItemsChange = jest.fn()
        render(
            <Router>
                <Card
                    data={DEFAULT_ITEM}
                    handleSavedItemsChange={handleSavedItemsChange}
                    handleAlertChange={handleAlertChange}
                    showButtons={true}
                />
            </Router>
        )
        userEvent.click(screen.getByTestId("save_item_btn"))
        expect(handleSavedItemsChange).toHaveBeenCalled();
    })


    test("Display all category cards", () => {
        render(<Categories
            data={CATEGORIES}
            selectedCategories={[]}
            handleSelectCategories={jest.fn()}
        />)

        let testIdList = CATEGORIES.map((category) => {
            return "category_card" + category.name
        })

        testIdList.map((testId) => {
            return expect(screen.getByTestId(testId)).toBeInTheDocument();
        })
    })

    test("Select a specific category", async () => {
        let selectedCategories;
        
        let handleSelectCategories = jest.fn(() => {
            selectedCategories = ["Beauty"];
            return selectedCategories;
        })

        render(<Categories
            data={CATEGORIES}
            selectedCategories={selectedCategories}
            handleSelectCategories={handleSelectCategories}
        />)

        expect(screen.getByTestId("category_cardBeauty")).toBeInTheDocument();
        
        await fireEvent.click(screen.getByTestId("category_cardBeauty"))
        expect(handleSelectCategories).toHaveBeenCalled();
    })

    test("Click page navigator next button", () => {
        let handleChangePageNum = jest.fn()
        render(<PageNavigator 
            pageNum={1}
            totalPages={2}
            handleChangePageNum={handleChangePageNum}
        />)

        userEvent.click(screen.getByTestId("next_btn"))
        expect(handleChangePageNum).toHaveBeenCalled();
    })
})


describe("Test Homepage Footer", () => {
    test('Render footer without errors', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );
        expect(screen.getByTestId("footer_main_body")).toBeInTheDocument();
        expect(screen.getByTestId("copyright")).toBeInTheDocument();
    })

    test('Email subscribing form exists', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );
        expect(screen.getByTestId('form')).toBeInTheDocument();
        expect(screen.getByTestId('submit_btn')).toBeInTheDocument();
        expect(screen.getByTestId('submit_btn')).toBeEnabled();
    })

    test('Receive typed-in text from form', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );
        userEvent.type(screen.getByRole('textbox'), "aaa@a.com")
        expect(screen.getByRole("textbox")).toHaveValue("aaa@a.com")
    })
})
