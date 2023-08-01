import {useEffect, useState} from "react";
import CustomDropdown from "./components/CustomDropdown";
import MessageStatus from "./components/MessageStatus";
import ColorCode from "./components/ColorCode";

const SHEET_URL = `https://sheetdb.io/api/v1/0d686gm3nst8w`;
const MULTI_SHEET_URL = `${SHEET_URL}?sheet=`;

// eslint-disable-next-line no-unused-vars
const FALLBACK_DATA = [
	{
		employeeID: "MNK1234",
		colors: "ORANGE",
		token: "1",
		duplicates: "no",
	},
	{
		employeeID: "KNJ1234",
		colors: "YELLOW",
		token: "2",
		duplicates: "no",
	},
	{
		employeeID: "MNK1234",
		colors: "ORANGE",
		token: "3",
		duplicates: "yes",
	},
	{
		employeeID: "MNK1234",
		colors: "ORANGE",
		token: "1",
		duplicates: "yes",
	},
	{
		employeeID: "MNK1234",
		colors: "ORANGE",
		token: "1",
		duplicates: "yes",
	},
];

const COLOR_OPTIONS = [
	{color: "bg-pink-400", name: "Pink", id: 6, icon: ""},
	{color: "bg-lime-400", name: "Green", id: 4, icon: ""},
	{color: "bg-blue-400", name: "Blue", id: 5, icon: ""},
];

function App() {
	const [sheetsData, setSheetsData] = useState(FALLBACK_DATA);
	const [empId, setEmpId] = useState("");
	const [messageStatus, setMessageStatus] = useState({status: "", message: ""});
	const [loading, setLoading] = useState(false);
	const [tokenPink, setTokenPink] = useState("");
	const [tokenGreenOne, setTokenGreenOne] = useState("");
	const [tokenGreenTwo, setTokenGreenTwo] = useState("");
	const [tokenBlueOne, setTokenBlueOne] = useState("");
	const [tokenBlueTwo, setTokenBlueTwo] = useState("");
	const [selectedColor, setSelectedColor] = useState("Pink");
	const [duplicate, setDuplicate] = useState(false);
	// const [isSubmitted, setIsSubmitted] = useState(false);

	// Function to reset form fields
	const resetForm = () => {
		console.log("RESET FORM");
		setEmpId("");
		setTokenPink("");
		setTokenGreenOne("");
		setTokenGreenTwo("");
		setTokenBlueOne("");
		setTokenBlueTwo("");
		setDuplicate(false);
		setSelectedColor("Pink");
		setLoading(false);
		setMessageStatus({status: "", message: ""});
	};

	const getSheetData = () => {
		setLoading(true);

		fetch(SHEET_URL)
			.then((response) => response.json())
			.then((data) => setSheetsData(data))
			.catch((error) => {
				console.log(error);
				resetForm();
			});

		setLoading(false);

		console.log("GET SHEET DATA");
	};

	const sendSheetEntry = (data, sheetName) => {
		fetch(`${MULTI_SHEET_URL}${sheetName}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				console.log("DATA SENT");
				response.json();
				getSheetData();
				resetForm();
			})
			.catch((error) => {
				console.log(error);
				resetForm();
			});
	};

	useEffect(() => {
		getSheetData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const sendSheetEntryReq = (isDuplicateYesOrNo) => {
		const PINK_DATA = {
			attuid: empId,
			colors: selectedColor,
			token: tokenPink,
			duplicates: isDuplicateYesOrNo,
		};

		const GREEN_DATA = {
			attuid: empId,
			colors: "GREEN",
			token1: tokenGreenOne,
			token2: tokenBlueTwo,
			duplicates: isDuplicateYesOrNo,
		};

		const BLUE_DATA = {
			attuid: empId,
			colors: "BLUE",
			token1: tokenBlueOne,
			token2: tokenGreenTwo,
			duplicates: isDuplicateYesOrNo,
		};

		sendSheetEntry(PINK_DATA, "PINK");
		sendSheetEntry(GREEN_DATA, "GREEN");
		sendSheetEntry(BLUE_DATA, "BLUE");
	};

	// * --------------------------------------------------------
	// * FORM HANDLER METHODS
	// #region

	const onEmpIdChange = (event) => {
		const employeeId = event.target.value;
		setEmpId(employeeId);
	};

	const handleCheckboxChange = () => {
		setDuplicate(!duplicate);
	};

	// ----------------------------------------------------------
	// * PINK TOKEN
	const onTokenPinkChange = (event) => {
		const tokenValue = event.target.value;

		// Validate the token value to be a number between 0 and 100
		if (isNaN(tokenValue) || tokenValue < 0 || tokenValue > 100) {
			console.log("TOKEN VALIDATION");
			// If the token is not a number or is outside the range, set it to an empty string
			// or you can display an error message to the user
			setTokenPink("");
			setMessageStatus({status: "ALERT", message: "Token must be a number between 0 and 100"});
			return;
		}

		setTokenPink(parseInt(tokenValue, 10));
		setMessageStatus({});
	};

	// ----------------------------------------------------------
	// * GREEN TOKEN
	const onTokenGreenOneChange = (event) => {
		const tokenValue = event.target.value;

		// Validate the token value to be a number between 0 and 100
		if (isNaN(tokenValue) || tokenValue < 0 || tokenValue > 100) {
			console.log("TOKEN VALIDATION");
			// If the token is not a number or is outside the range, set it to an empty string
			// or you can display an error message to the user
			setTokenGreenOne("");
			setMessageStatus({status: "ALERT", message: "Token must be a number between 0 and 100"});
			return;
		}

		setTokenGreenOne(parseInt(tokenValue, 10));
		setMessageStatus({});
	};

	const onTokenGreenTwoChange = (event) => {
		const tokenValue = event.target.value;

		// Validate the token value to be a number between 0 and 100
		if (isNaN(tokenValue) || tokenValue < 0 || tokenValue > 100) {
			console.log("TOKEN VALIDATION");
			// If the token is not a number or is outside the range, set it to an empty string
			// or you can display an error message to the user
			setTokenGreenTwo("");
			setMessageStatus({status: "ALERT", message: "Token must be a number between 0 and 100"});
			return;
		}

		setTokenGreenTwo(parseInt(tokenValue, 10));
		setMessageStatus({});
	};

	// ----------------------------------------------------------
	// * BLUE TOKEN
	const onTokenBlueOneChange = (event) => {
		const tokenValue = event.target.value;

		// Validate the token value to be a number between 0 and 100
		if (isNaN(tokenValue) || tokenValue < 0 || tokenValue > 100) {
			console.log("TOKEN VALIDATION");
			// If the token is not a number or is outside the range, set it to an empty string
			// or you can display an error message to the user
			setTokenBlueOne("");
			setMessageStatus({status: "ALERT", message: "Token must be a number between 0 and 100"});
			return;
		}

		setTokenBlueOne(parseInt(tokenValue, 10));
		setMessageStatus({});
	};

	const onTokenBlueTwoChange = (event) => {
		const tokenValue = event.target.value;

		// Validate the token value to be a number between 0 and 100
		if (isNaN(tokenValue) || tokenValue < 0 || tokenValue > 100) {
			console.log("TOKEN VALIDATION");
			// If the token is not a number or is outside the range, set it to an empty string
			// or you can display an error message to the user
			setTokenBlueTwo("");
			setMessageStatus({status: "ALERT", message: "Token must be a number between 0 and 100"});
			return;
		}

		setTokenBlueTwo(parseInt(tokenValue, 10));
		setMessageStatus({});
	};

	// * --------------------------------------------------------
	// #endregion

	// ----------------------------------------------------------
	// * HANDLE SUBMIT METHOD
	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);
		// Reset previous error messages
		setMessageStatus({status: "", message: ""});

		const isTokenAvailable =
			Boolean(tokenPink) &&
			Boolean(tokenGreenOne) &&
			Boolean(tokenGreenTwo) &&
			Boolean(tokenBlueOne) &&
			Boolean(tokenBlueTwo);

		if (!isTokenAvailable) {
			console.log("TOKEN CHECKS");
			setMessageStatus({
				status: "ALERT",
				message: "PLEASE FILL ALL PINK, GREEN & BLUE TOKENS",
			});
			setLoading(false);
			return; // Do not proceed with form submission
		}

		// Check if empId exists in sheetsData
		const isAttUidDuplicate = sheetsData?.some(
			(entry) => entry?.attuid.toUpperCase() === empId.toUpperCase()
		);

		// const isTokenDuplicate = sheetsData?.some(
		// 	(entry) => Number(entry?.token) === Number(tokenPink)
		// );

		// console.log(isTokenDuplicate, duplicate);

		if (isAttUidDuplicate && !duplicate) {
			setMessageStatus({
				status: "ALERT",
				message: "ATTUID ALREADY REGISTERED",
			});
			setLoading(false);
			return; // Do not proceed with form submission
		}

		// if (isTokenDuplicate) {
		// 	setMessageStatus({
		// 		status: "ALERT",
		// 		message: `TOKEN ALREADY EXISTS`,
		// 	});
		// 	setLoading(false);
		// 	return; // Do not proceed with form submission
		// }

		const isDuplicateYesOrNo = duplicate ? "yes" : "no";

		//&& !isTokenDuplicate
		if (!isAttUidDuplicate) {
			console.log("sending normally");

			sendSheetEntryReq(isDuplicateYesOrNo);

			return;
		}

		// && !isTokenDuplicate
		// sending a duplicate Employee ID entry if duplicate is checked
		if (isAttUidDuplicate && duplicate) {
			console.log("send from duplicate");

			sendSheetEntryReq(isDuplicateYesOrNo);

			return;
		}

		setLoading(false);
	};

	return (
		<div className="h-screen relative">
			<header className="h-20 md:h-28 w-full mb-4">
				<nav className="max-w-7xl h-full mx-auto px-6 flex items-center justify-between">
					<div>
						<img src="/at&t_logo.png" alt="at&t" className="h-20 md:h-28" />
					</div>

					<div>
						<img src="/favourance_logo.png" alt="favourance" className="h-20 md:h-28" />
					</div>
				</nav>
			</header>

			<main className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
				<section>
					<div className="text-center mb-8">
						<h1 className="text-3xl md:text-5xl text-[#3F4075] font-semibold">
							Token Generation System
						</h1>
					</div>

					<div className="bg-slate-50 rounded-3xl md:py-14 py-10 shadow-md px-4 flex flex-col justify-between gap-8">
						<form className="max-w-xl mx-auto w-full" onSubmit={handleSubmit}>
							<div className="space-y-6">
								<fieldset>
									<label
										htmlFor="empId"
										className="font-semibold uppercase text-base md:text-xl text-[#3F4075] "
									>
										ATTUID
									</label>
									<div className="shadow-[0px_1px_5px_0px_rgba(0,0,0,0.20)] rounded-full py-1 px-4 flex items-center mt-2 bg-white">
										<input
											name="empId"
											id="empId"
											type="text"
											value={empId}
											onChange={onEmpIdChange}
											placeholder="Enter ATTUID"
											className="focus:outline-none px-2 py-2 w-full rounded"
											required
										/>
									</div>
								</fieldset>

								{/* ------------------------------------------------------------------ */}

								<fieldset>
									<label
										htmlFor="colors"
										className="font-semibold uppercase text-base md:text-xl text-[#3F4075]"
									>
										colors
									</label>

									<CustomDropdown
										options={COLOR_OPTIONS}
										onChange={setSelectedColor}
										resetValue={selectedColor}
									/>
									<ColorCode
										colors={COLOR_OPTIONS}
										onChange={setSelectedColor}
										resetValue={selectedColor}
									/>
								</fieldset>

								{selectedColor === "Pink" ? (
									<fieldset>
										<label
											htmlFor="token"
											className="font-semibold uppercase text-base md:text-xl text-[#3F4075]"
										>
											Pink Token
										</label>

										<div className="shadow-[0px_1px_5px_0px_rgba(0,0,0,0.20)] rounded-full py-1 px-4 flex items-center mt-2 bg-white">
											<input
												name="token"
												id="token"
												type="number"
												value={tokenPink}
												onChange={onTokenPinkChange}
												placeholder="Enter Token"
												className="focus:outline-none px-2 py-2 w-full rounded"
												required
											/>
										</div>
									</fieldset>
								) : selectedColor === "Green" ? (
									<fieldset>
										<label
											htmlFor="token"
											className="font-semibold uppercase text-base md:text-xl text-[#3F4075]"
										>
											Green Token
										</label>

										<div className="shadow-[0px_1px_5px_0px_rgba(0,0,0,0.20)] rounded-full py-1 px-4 flex items-center mt-2 mb-4 bg-white">
											<input
												name="token"
												id="token"
												type="number"
												value={tokenGreenOne}
												onChange={onTokenGreenOneChange}
												placeholder="Enter Token"
												className="focus:outline-none px-2 py-2 w-full rounded"
												required
											/>
										</div>

										<div className="shadow-[0px_1px_5px_0px_rgba(0,0,0,0.20)] rounded-full py-1 px-4 flex items-center mt-2  bg-white">
											<input
												name="token"
												id="token"
												type="number"
												value={tokenGreenTwo}
												onChange={onTokenGreenTwoChange}
												placeholder="Enter Token"
												className="focus:outline-none px-2 py-2 w-full rounded"
												required
											/>
										</div>
									</fieldset>
								) : selectedColor === "Blue" ? (
									<fieldset>
										<label
											htmlFor="token"
											className="font-semibold uppercase text-base md:text-xl text-[#3F4075]"
										>
											Blue Token
										</label>

										<div className="shadow-[0px_1px_5px_0px_rgba(0,0,0,0.20)] rounded-full py-1 px-4 flex items-center mt-2 mb-4 bg-white">
											<input
												name="token"
												id="token"
												type="number"
												value={tokenBlueOne}
												onChange={onTokenBlueOneChange}
												placeholder="Enter Token"
												className="focus:outline-none px-2 py-2 w-full rounded"
												required
											/>
										</div>

										<div className="shadow-[0px_1px_5px_0px_rgba(0,0,0,0.20)] rounded-full py-1 px-4 flex items-center mt-2 bg-white">
											<input
												name="token"
												id="token"
												type="number"
												value={tokenBlueTwo}
												onChange={onTokenBlueTwoChange}
												placeholder="Enter Token"
												className="focus:outline-none px-2 py-2 w-full rounded"
												required
											/>
										</div>
									</fieldset>
								) : null}

								<fieldset className="flex items-center gap-2">
									<div
										className="checkbox-container"
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											width: "20px",
											height: "20px",
											border: "2px solid #3F4075",
											borderRadius: "4px",
											cursor: "pointer",
											background: duplicate ? "#3F4075" : "transparent",
										}}
										onClick={handleCheckboxChange}
									>
										{duplicate && (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="white"
												width="12px"
												height="12px"
											>
												<path d="M19.59 6.58L10 16.17l-4.59-4.58a.996.996 0 10-1.41 1.41l5.3 5.3c.39.39 1.03.39 1.42 0l9.01-9a.996.996 0 000-1.41c-.38-.39-1.02-.39-1.41 0z" />
											</svg>
										)}
									</div>
									<label htmlFor="dups" className="text-lg text-[#3F4075]">
										Only for duplicate entries
									</label>
								</fieldset>
							</div>

							<div className="flex flex-col gap-3 justify-center mt-6 md:flex-row">
								<button
									type="submit"
									className="uppercase px-12 py-2 bg-green-400 text-white rounded-full disabled:bg-slate-400 disabled:cursor-not-allowed font-medium"
									disabled={loading}
								>
									{loading ? "Loading..." : "Send"}
								</button>

								<a
									href={`https://docs.google.com/spreadsheets/d/1Sk2djRliwCdoyLKCleICc1bxoBbZ41_2Tu7IOQ0ic4Y/edit#gid=0`}
									className="uppercase px-12 py-2 bg-blue-400 text-white rounded-full font-medium text-center"
									target="_blank"
									rel="noreferrer"
								>
									view
								</a>
							</div>
						</form>

						<MessageStatus messageStatus={messageStatus} />
					</div>
				</section>

				<footer>
					<div className="text-center">
						<p className="text-slate-400 text-sm md:text-base">
							Copyright© Eventive Communications, Developed By PrismScale Pvt. Ltd.
						</p>
					</div>
				</footer>
			</main>
		</div>
	);
}

export default App;
