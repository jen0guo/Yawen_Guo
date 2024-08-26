import React, { useState } from "react";
import Categories from "./categories";
import { CardDeck } from "./cardDeck";

/**
 * @param props.allItems: items information in the realtime database
 * @param props.categoryList: the default category list in data.js
 * @param props.handleSavedItemsChange: the function to change the saved items
 * @param props.handleAlertChange: the function to set alert condition
 * @param props.selectedCategories: the categories that user selected
 * @param props.handleSelectCategories: the function to set the selected categories
 */


export function PageNavigator(props) {
	let pageNum = props.pageNum
	let totalPages = props.totalPages
	let handleChangePageNum = props.handleChangePageNum

	const prevButton = () => {
		return (
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => handleChangePageNum(0)}
				style={{ float: "left" }}
				disabled={pageNum === 1}
				data-testid="previous_btn"
			>
				<nobr>
					<i className="bi bi-arrow-left"></i>
					Previous
				</nobr>
			</button>
		);
	};
	
	const nextButton = () => {
		return (
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => handleChangePageNum(1)}
				style={{ float: "right" }}
				disabled={pageNum === totalPages}
				data-testid="next_btn"
			>
				<nobr>
					Next
					<i className="bi bi-arrow-right"></i>
				</nobr>
			</button>
		);
	};

	return (
		<div>
			{prevButton()}
			{nextButton()}
		</div>
	);
}

export default function HomePage(props) {
	const NUMITEMSPERPAGE = 30; // the number of item cards per page on the homepage
	const [pageNum, setPageNum] = useState(1);

	let totalPages;
	let pageItems;
	if (props.allItems) {
		const allItemsList = Object.keys(props.allItems).map(
			(key) => props.allItems[key]
		);
		const start = NUMITEMSPERPAGE * (pageNum - 1);
		pageItems = allItemsList.slice(start, start + NUMITEMSPERPAGE);
		totalPages = parseInt(allItemsList.length / NUMITEMSPERPAGE);
		if (allItemsList.length % NUMITEMSPERPAGE > 0) {
			totalPages += 1;
		}
	} else {
		pageItems = [];
		totalPages = 1;
	}

	// pass 1 to direction means changing to the next page
	// pass 0 to direction means changing to the previous page
	function handleChangePageNum(direction) {
		if (direction === 1) {
			setPageNum(pageNum + 1);
		} else if (direction === 0) {
			setPageNum(pageNum - 1);
		}
	}

	return (
		<div data-testid="homepage_body">
			<div className="container-fluid">
				<div id="cards" className="row row-cols-auto">
					<div className="col col-md-4 col-lg-3" data-testid="Categories">
						<Categories
							data={props.categoryList}
							selectedCategories={props.selectedCategories}
							handleSelectCategories={
								props.handleSelectCategories
							}
						/>
					</div>
					<div className="col col-md-8">
						<div className="row" data-testid="CardDeck">
							<CardDeck
								items={pageItems}
								handleSavedItemsChange={
									props.handleSavedItemsChange
								}
								handleAlertChange={props.handleAlertChange}
							/>
						</div>
						<div className="row" data-testid="PageNavigator">
							<PageNavigator 
								pageNum={pageNum}
								totalPages={totalPages}
								handleChangePageNum={handleChangePageNum}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
