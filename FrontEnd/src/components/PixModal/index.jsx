import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PixIcon from '@mui/icons-material/Pix';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { getPaymentStatus } from '../../services/paymentService.js';
import {
  Actions,
  CloseBtn,
  CopyBtn,
  Divider,
  Heading,
  Instruction,
  Overlay,
  PixCode,
  QRImage,
  StatusBadge,
  Subheading,
  Wrapper,
} from './styles.js';

/**
 * Modal que exibe o QR Code e o código copia-e-cola do Pix.
 * Faz polling a cada 5s para verificar se o pagamento foi confirmado.
 *
 * Props:
 *  - qrCode: { encodedImage, payload, expirationDate }
 *  - paymentId: string
 *  - value: number
 *  - onSuccess: () => void   — chamado quando pagamento é confirmado
 *  - onClose: () => void
 */
export function PixModal({ qrCode, paymentId, value, onSuccess, onClose }) {
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('PENDING');
  const intervalRef = useRef(null);

  // Polling de status
  useEffect(() => {
    if (!paymentId) return;

    intervalRef.current = setInterval(async () => {
      try {
        const data = await getPaymentStatus(paymentId);
        setPaymentStatus(data.status);

        if (data.status === 'RECEIVED' || data.status === 'CONFIRMED') {
          clearInterval(intervalRef.current);
          onSuccess();
        }
      } catch {
        // silencia erros de polling
      }
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [paymentId, onSuccess]);

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCode.payload).then(() => {
      setCopied(true);
      toast.success('Código Pix copiado!');
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const isConfirmed = paymentStatus === 'RECEIVED' || paymentStatus === 'CONFIRMED';

  return (
    <Overlay>
      <Wrapper>
        <CloseBtn onClick={onClose} aria-label="Fechar modal">×</CloseBtn>

        <PixIcon style={{ fontSize: 40, color: '#00BFA5' }} />
        <Heading>Pague com Pix</Heading>
        <Subheading>
          Valor: <strong>R$ {value?.toFixed(2).replace('.', ',')}</strong>
        </Subheading>

        {isConfirmed ? (
          <StatusBadge $success>
            <CheckCircleIcon /> Pagamento confirmado!
          </StatusBadge>
        ) : (
          <StatusBadge>Aguardando pagamento…</StatusBadge>
        )}

        <QRImage
          src={`data:image/png;base64,${qrCode.encodedImage}`}
          alt="QR Code Pix"
        />

        <Divider />

        <Instruction>Ou copie o código abaixo:</Instruction>
        <PixCode readOnly value={qrCode.payload} />

        <Actions>
          <CopyBtn onClick={handleCopy} $copied={copied}>
            <ContentCopyIcon fontSize="small" />
            {copied ? 'Copiado!' : 'Copiar código'}
          </CopyBtn>
        </Actions>
      </Wrapper>
    </Overlay>
  );
}
