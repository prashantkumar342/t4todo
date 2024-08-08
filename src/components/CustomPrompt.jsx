import PropTypes from 'prop-types'
function CustomPrompt({ message, lbtn, rbtn, lbg, rbg, lc, rc, lfunc, rfunc }) {
  return (
    <div className="promptWrapper">
      <div className="prompt">
        <div className="messagewrapper">
          <p className="mainmessage">{message}</p>
        </div>
        <div className="buttons">
          <button onClick={lfunc} style={{ backgroundColor: lbg, color: lc }}>{lbtn}</button>
          <button onClick={rfunc} style={{ backgroundColor: rbg, color: rc }}>{rbtn}</button>
        </div>
      </div>
    </div>
  )
}

CustomPrompt.propTypes = {
  message: PropTypes.string,
  lbtn: PropTypes.string,
  rbtn: PropTypes.string,
  lbg: PropTypes.string,
  rbg: PropTypes.string,
  lc: PropTypes.string,
  rc: PropTypes.string,
  lfunc: PropTypes.func,
  rfunc: PropTypes.func
}
export default CustomPrompt