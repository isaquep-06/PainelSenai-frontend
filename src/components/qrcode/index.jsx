import QR from '../../assets/qrcodeSenai.png'
import * as S from './style.js'

function QRCode() {
  return (
    <S.Container>
      <S.Title>Acompanhe em tempo real</S.Title>

      <S.QRWrapper>
        <S.QRImg src={QR} alt="QR Code do sistema" />
      </S.QRWrapper>

      <S.Description>
        Escaneie o QR Code
      </S.Description>

      <S.Signature>by Isaque</S.Signature>
    </S.Container>
  )
}

export default QRCode;