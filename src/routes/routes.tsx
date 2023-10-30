import {BrowserRouter, Routes} from 'react-router-dom';

function Route() {
  return (
    <BrowserRouter>
      <div className='min-h-[80vh]'>
          <Routes>
              {/* <Route path="/" element={} />
              <Route path="/login" element={} />
              <Route path="/home" element={} />
              <Route path="/cadastro" element={} /> */}
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default Route;