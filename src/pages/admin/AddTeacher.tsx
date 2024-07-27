import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const AddTeacher = () => {
  return (
    <div className="flex flex-col min-h-screen p-4 lg:p-10 ml-16">
      <div className="flex flex-col w-full max-w-4xl p-4 lg:p-10 bg-white rounded shadow-md mt-10">
        <div className="text-2xl font-bold mb-6 text-center">Add New Teacher</div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              id="outlined-name"
              label="Name"
              placeholder="Enter teacher's name"
              multiline
              maxRows={4}
            />
            <TextField
              id="outlined-email"
              label="Email"
              placeholder="Enter teacher's email"
              multiline
              maxRows={4}
            />
            <TextField
              id="outlined-subject"
              label="Subject"
              placeholder="Enter subject"
              multiline
              maxRows={4}
            />
            <TextField
              id="outlined-description"
              label="Description"
              placeholder="Enter description"
              multiline
              maxRows={4}
            />
            <TextField
              id="outlined-experience"
              label="Years of Experience"
              placeholder="Enter years of experience"
              type="number"
            />
            <TextField
              id="outlined-certificate"
              label="Certificate"
              InputProps={{
                inputProps: {
                  accept: 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                },
                inputComponent: 'input',
              }}
              type="file"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="outlined-resume"
              label="Resume"
              InputProps={{
                inputProps: {
                  accept: 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                },
                inputComponent: 'input',
              }}
              type="file"
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className='flex justify-end'>
          <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Create a teacher
        </button>
        </div>
        </Box>
      </div>
    </div>
  );
}

export default AddTeacher;
