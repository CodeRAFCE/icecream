import {useEffect, useState} from "react";
import CustomDropdown from "./components/CustomDropdown";
import MessageStatus from "./components/MessageStatus";
import ColorCode from "./components/ColorCode";

const SHEET_URL = `https://sheetdb.io/api/v1/0d686gm3nst8w`;
// const MULTI_SHEET_URL = `${SHEET_URL}?sheet=`;

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
	{color: "bg-orange-400", name: "Orange", id: 2, icon: ""},
	{color: "bg-yellow-400", name: "Yellow", id: 3, icon: ""},
	{color: "bg-lime-400", name: "Green", id: 4, icon: ""},
	{color: "bg-blue-400", name: "Blue", id: 5, icon: ""},
	{color: "bg-pink-400", name: "Pink", id: 6, icon: ""},
];

function App() {
	const [sheetsData, setSheetsData] = useState();
	const [empId, setEmpId] = useState("");
	const [messageStatus, setMessageStatus] = useState({status: "", message: ""});
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState("");
	const [selectedColor, setSelectedColor] = useState("ORANGE");
	const [duplicate, setDuplicate] = useState(false);
	// const [isSubmitted, setIsSubmitted] = useState(false);

	const getSheetData = () => {
		setLoading(true);

		fetch(SHEET_URL)
			.then((response) => response.json())
			.then((data) => setSheetsData(data));

		setLoading(false);

		console.log("GET SHEET DATA");
	};

	const sendSheetEntry = (data) => {
		fetch(SHEET_URL, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				employeeID: data.empId.toUpperCase(),
				colors: selectedColor,
				token: data.token,
				duplicates: data.isDuplicateYesOrNo,
			}),
		}).then((response) => {
			console.log("DATA SENT");
			response.json();
			resetForm();
			getSheetData();
		});
	};

	useEffect(() => {
		getSheetData();
	}, []);

	// * --------------------------------------------------------
	// * FORM HANDLER METHODS

	// Function to reset form fields
	const resetForm = () => {
		console.log("RESET FORM");
		setEmpId("");
		setToken("");
		setDuplicate(false);
		setSelectedColor("ORANGE");
		setLoading(false);
		setMessageStatus("");
	};

	const onEmpIdChange = (event) => {
		const employeeId = event.target.value;
		setEmpId(employeeId);
	};

	const handleCheckboxChange = () => {
		setDuplicate(!duplicate);
	};

	const onTokenChange = (event) => {
		const tokenValue = event.target.value;

		// Validate the token value to be a number between 0 and 100
		if (isNaN(tokenValue) || tokenValue < 0 || tokenValue > 100) {
			// If the token is not a number or is outside the range, set it to an empty string
			// or you can display an error message to the user
			setToken("");
			setMessageStatus({status: "ALERT", message: "Token must be a number between 0 and 100"});
			return;
		}

		setToken(parseInt(tokenValue, 10));
		setMessageStatus({});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);
		// Reset previous error messages
		setMessageStatus({status: "", message: ""});

		// Check if empId exists in sheetsData
		const isEmpIdDuplicate = sheetsData?.some(
			(entry) => entry?.employeeID.toUpperCase() === empId.toUpperCase()
		);

		const isTokenDuplicate = sheetsData?.some((entry) => Number(entry?.token) === Number(token));

		console.log(isTokenDuplicate, duplicate);

		if (isEmpIdDuplicate && !duplicate) {
			setMessageStatus({
				status: "ALERT",
				message: "EMPLOYEE ID ALREADY REGISTERED",
			});
			setLoading(false);
			return; // Do not proceed with form submission
		}

		if (isTokenDuplicate) {
			setMessageStatus({
				status: "ALERT",
				message: `TOKEN ALREADY EXISTS`,
			});
			setLoading(false);
			return; // Do not proceed with form submission
		}

		const isDuplicateYesOrNo = duplicate ? "yes" : "no";

		const data = {
			empId,
			// uid,
			isDuplicateYesOrNo,
			token,
			selectedColor,
		};

		if (!isEmpIdDuplicate && !isTokenDuplicate) {
			console.log("sending normally");
			sendSheetEntry(data);
			return;
		}

		// sending a duplicate Employee ID entry if duplicate is checked
		if (isEmpIdDuplicate && duplicate && !isTokenDuplicate) {
			console.log("send from duplicate");
			sendSheetEntry(data);
			return;
		}

		setLoading(false);
	};
	// * --------------------------------------------------------

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

			<main className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
				<section>
					<div className="text-center mb-8">
						<h1 className="text-5xl text-[#3F4075] font-semibold">Token Generation System</h1>
					</div>

					<div className="bg-slate-50 rounded-3xl py-14 shadow-md px-4 flex flex-col justify-between gap-8">
						<form className="max-w-xl mx-auto w-full" onSubmit={handleSubmit}>
							<div className="space-y-6">
								<fieldset>
									<label
										htmlFor="empId"
										className="font-semibold uppercase text-xl text-[#3F4075] "
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
										className="font-semibold uppercase text-xl text-[#3F4075]"
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

								<fieldset>
									<label htmlFor="token" className="font-semibold uppercase text-xl text-[#3F4075]">
										Token
									</label>

									<div className="shadow-[0px_1px_5px_0px_rgba(0,0,0,0.20)] rounded-full py-1 px-4 flex items-center mt-2 bg-white">
										<input
											name="token"
											id="token"
											type="number"
											value={token}
											onChange={onTokenChange}
											placeholder="Enter Token"
											className="focus:outline-none px-2 py-2 w-full rounded"
											required
										/>
									</div>
								</fieldset>

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

							<div className="flex flex-row gap-3 justify-center mt-6">
								<button
									type="submit"
									className="uppercase px-12 py-2 bg-green-400 text-white rounded-full disabled:bg-slate-400 disabled:cursor-not-allowed font-medium"
								>
									{loading ? "Loading..." : "Send"}
								</button>

								<a
									href={`https://docs.google.com/spreadsheets/d/1Sk2djRliwCdoyLKCleICc1bxoBbZ41_2Tu7IOQ0ic4Y/edit#gid=0`}
									className="uppercase px-12 py-2 bg-blue-400 text-white rounded-full font-medium"
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
						<p className="text-slate-400">
							Copyright© Eventive Communications, Developed By PrismScale Pvt. Ltd.
						</p>
					</div>
				</footer>
			</main>
		</div>
	);
}

export default App;
