import { QRCodeCanvas } from 'qrcode.react'
import * as S from './style.js'

function QRCode() {
  const urlSistema = 'https://painel-senai-frontend.vercel.app'
  return (
    <S.Container>
      <S.Title>Acompanhe em tempo real</S.Title>

      <S.QRWrapper>
        <QRCodeCanvas
          value={urlSistema}
          size={110}
          includeMargin={true}
        />
      </S.QRWrapper>

      <S.Description>
        Escaneie o QR Code
      </S.Description>

      <S.Signature>by Isaque</S.Signature>
    </S.Container>
  )
}

export default QRCode