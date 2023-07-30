import {useState} from "react";
import CustomDropdown from "./components/CustomDropdown";

const COUNT = 1;

const COLOR_OPTIONS = [
	{color: "red", name: "RED", id: 1, icon: ""},
	{color: "orange", name: "ORANGE", id: 2, icon: ""},
	{color: "yellow", name: "YELLOW", id: 3, icon: ""},
	{color: "green", name: "GREEN", id: 4, icon: ""},
	{color: "blue", name: "BLUE", id: 5, icon: ""},
	{color: "indigo", name: "INDIGO", id: 6, icon: ""},
	{color: "violet", name: "VIOLET", id: 7, icon: ""},
];

function App() {
	const [empId, setEmpId] = useState();
	const [uid, setUid] = useState();
	const [token, setToken] = useState(COUNT);
	const [selectedColor, setSelectedColor] = useState("RED");
	// const [isSubmitted, setIsSubmitted] = useState(false);

	// * --------------------------------------------------------
	// * FORM HANDLER METHODS

	const onEmpIdChange = (event) => {
		const employeeId = event.target.value;
		setUid(employeeId);
	};

	const onUidChange = (event) => {
		const uniqueId = event.target.value;
		setEmpId(uniqueId);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// setIsSubmitted(true);

		const data = {
			empId,
			uid,
			token,
			selectedColor,
		};

		console.log("SUBMIT CLICKED", data);

		setToken((prev) => prev + 1);
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
									onChange={onEmpIdChange}
									placeholder="Enter Employee ID"
									className="border border-slate-500 focus:outline-none px-2 py-2 w-full rounded"
									required
								/>
							</fieldset>

							{/* ------------------------------------------------------------------ */}

							<fieldset>
								<label htmlFor="uid" className="font-semibold uppercase">
									UID
								</label>
								<input
									name="uid"
									id="uid"
									type="text"
									onChange={onUidChange}
									placeholder="Enter a unique id"
									className="border border-slate-500 focus:outline-none px-2 py-2 w-full rounded"
									required
								/>
							</fieldset>

							<fieldset>
								<label htmlFor="colors" className="font-semibold uppercase">
									colors
								</label>

								<CustomDropdown options={COLOR_OPTIONS} onChange={setSelectedColor} />
							</fieldset>
						</div>

						<div className="p-8 text-center bg-white border border-zinc-300 rounded my-10">
							<h1 className="text-2xl md:text-5xl font-semibold">TOKEN: {token}</h1>
						</div>

						<div className="flex flex-row gap-3 justify-center">
							<button
								type="submit"
								className="uppercase px-6 py-2 bg-orange-400 text-white rounded"
							>
								Send
							</button>

							<a href="#" className="uppercase px-6 py-2 bg-orange-400 text-white rounded">
								GO to EXCEL
							</a>
						</div>
					</form>
				</section>
			</main>
		</>
	);
}

export default App;
