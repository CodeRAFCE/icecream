import {useEffect, useState} from "react";
import CustomDropdown from "./components/CustomDropdown";
import AlertIcon from "./components/AlertIcon";

const SHEET_URL = `https://sheetdb.io/api/v1/0d686gm3nst8w`;
// const MULTI_SHEET_URL = `${SHEET_URL}?sheet=`;

const COLOR_OPTIONS = [
	{color: "orange", name: "ORANGE", id: 2, icon: ""},
	{color: "yellow", name: "YELLOW", id: 3, icon: ""},
	{color: "green", name: "GREEN", id: 4, icon: ""},
	{color: "blue", name: "BLUE", id: 5, icon: ""},
	{color: "pink", name: "PINK", id: 6, icon: ""},
];

function App() {
	const [sheetsData, setSheetsData] = useState([
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
	]);
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
		// getSheetData();
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
		}

		// sending a duplicate Employee ID entry if duplicate is checked
		if (isEmpIdDuplicate && duplicate && !isTokenDuplicate) {
			console.log("send from duplicate");
			sendSheetEntry(data);
		}

		setLoading(false);
	};
	// * --------------------------------------------------------

	return (
		<>
			<header className="h-20 w-full mb-10">
				<nav className="max-w-7xl h-full mx-auto px-6 flex items-center justify-between">
					<div>LOGO1</div>
					<div>LOGO2</div>
				</nav>
			</header>

			<main className="max-w-7xl mx-auto px-6">
				<section>
					<div className="">
						{messageStatus && (
							<>
								{messageStatus.status === "ALERT" && (
									<div className="my-6 flex items-center gap-3 justify-center bg-red-300 py-3 md:max-w-4xl md:mx-auto rounded-sm">
										<AlertIcon />
										<span className="text-lg font-semibold text-white">
											{messageStatus.message}
										</span>
									</div>
								)}
							</>
						)}
					</div>

					<form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
						<div className="space-y-4">
							<fieldset>
								<label htmlFor="empId" className="font-semibold uppercase">
									Employee ID
								</label>
								<input
									name="empId"
									id="empId"
									type="text"
									value={empId}
									onChange={onEmpIdChange}
									placeholder="Enter Employee ID"
									className="border border-slate-500 focus:outline-none px-2 py-2 w-full rounded"
									required
								/>
							</fieldset>

							{/* ------------------------------------------------------------------ */}

							<fieldset>
								<label htmlFor="colors" className="font-semibold uppercase">
									colors
								</label>

								<CustomDropdown
									options={COLOR_OPTIONS}
									onChange={setSelectedColor}
									resetValue={selectedColor}
								/>
							</fieldset>

							<fieldset>
								<label htmlFor="token" className="font-semibold uppercase">
									Token
								</label>
								<input
									name="token"
									id="token"
									type="number"
									value={token}
									onChange={onTokenChange}
									placeholder="Enter Token"
									className="border border-slate-500 focus:outline-none px-2 py-2 w-full rounded appearance-none"
									required
								/>
							</fieldset>

							<fieldset className="flex items-center gap-2">
								<input
									type="checkbox"
									name="dups"
									id="dups"
									checked={duplicate}
									value={duplicate}
									onChange={() => setDuplicate(!duplicate)}
								/>
								<label htmlFor="dups">
									Only check if you have to create a duplicate entry in the sheet
								</label>
							</fieldset>
						</div>

						<div className="flex flex-row gap-3 justify-center mt-6">
							<button
								type="submit"
								className="uppercase px-6 py-2 bg-orange-400 text-white rounded disabled:bg-slate-400 disabled:cursor-not-allowed"
							>
								{loading ? "Loading..." : "Send"}
							</button>

							<a
								href={`https://docs.google.com/spreadsheets/d/1Sk2djRliwCdoyLKCleICc1bxoBbZ41_2Tu7IOQ0ic4Y/edit#gid=0`}
								className="uppercase px-6 py-2 bg-orange-400 text-white rounded"
								target="_blank"
								rel="noreferrer"
							>
								GO to SHEET
							</a>
						</div>
					</form>
				</section>
			</main>
		</>
	);
}

export default App;
