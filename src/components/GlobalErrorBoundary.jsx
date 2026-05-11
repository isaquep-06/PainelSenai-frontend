import React from 'react';
import styled from 'styled-components';

/**
 * Container estilizado para a tela de erro
 */
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const ErrorCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px 20px;
  max-width: 600px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const ErrorTitle = styled.h1`
  color: #d32f2f;
  font-size: 24px;
  margin: 0 0 16px 0;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  color: #555;
  font-size: 16px;
  line-height: 1.6;
  margin: 12px 0;
`;

const ErrorDetails = styled.details`
  margin-top: 24px;
  text-align: left;
  background: #f5f5f5;
  border-left: 4px solid #d32f2f;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;

  summary {
    font-weight: 600;
    color: #333;
    user-select: none;

    &:hover {
      color: #d32f2f;
    }
  }

  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 12px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 12px;
    font-family: 'Courier New', monospace;
    margin: 12px 0 0 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: #1976d2;
    color: white;

    &:hover {
      background: #1565c0;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
    }
  }

  &.secondary {
    background: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      background: #efefef;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const SupportInfo = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: #e3f2fd;
  border-radius: 6px;
  color: #1565c0;
  font-size: 14px;
  line-height: 1.6;

  strong {
    display: block;
    margin-bottom: 8px;
  }

  a {
    color: #1976d2;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/**
 * Componente Error Boundary global para capturar erros na aplicação
 * Especialmente útil para erros com Intl em navegadores antigos
 */
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };

    // Log inicial
    console.log('[GlobalErrorBoundary] Componente montado');
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { errorCount } = this.state;
    const newErrorCount = errorCount + 1;

    this.setState({
      error,
      errorInfo,
      errorCount: newErrorCount,
    });

    // Log detalhado do erro
    console.error('[GlobalErrorBoundary] Erro capturado:', {
      message: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      count: newErrorCount,
      timestamp: new Date().toISOString(),
    });

    // Verificar se é erro de Intl
    if (error.message.includes('Intl') || error.message.includes('RelativeTimeFormat')) {
      console.error('[GlobalErrorBoundary] ⚠️ ERRO DE COMPATIBILIDADE INTL DETECTADO');
      console.error('Este navegador/WebView pode ter suporte limitado para APIs de internacionalização');
    }

    // Se múltiplos erros, pode indicar problema sistêmico
    if (newErrorCount > 3) {
      console.error('[GlobalErrorBoundary] ⚠️ MÚLTIPLOS ERROS DETECTADOS - Possível problema no sistema');
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    const { hasError, error, errorInfo, errorCount } = this.state;

    if (!hasError) {
      return this.props.children;
    }

    const isIntlError = error && (
      error.message.includes('Intl') ||
      error.message.includes('RelativeTimeFormat') ||
      error.message.includes('Icu error')
    );

    return (
      <ErrorContainer>
        <ErrorCard>
          <ErrorIcon>⚠️</ErrorIcon>

          <ErrorTitle>
            {isIntlError
              ? 'Erro de Compatibilidade Detectado'
              : 'Ocorreu um Erro na Aplicação'}
          </ErrorTitle>

          <ErrorMessage>
            {isIntlError
              ? 'Seu navegador ou Smart TV tem suporte limitado para este recurso.'
              : 'Desculpe, algo deu errado. A equipe técnica foi notificada.'}
          </ErrorMessage>

          {error && (
            <ErrorMessage style={{ color: '#d32f2f', fontWeight: 500 }}>
              {error.toString()}
            </ErrorMessage>
          )}

          {errorInfo && (
            <ErrorDetails>
              <summary>Ver detalhes técnicos</summary>
              <pre>{errorInfo.componentStack}</pre>
            </ErrorDetails>
          )}

          {isIntlError && (
            <SupportInfo>
              <strong>O que fazer?</strong>
              <div>
                • Atualize seu navegador para a versão mais recente<br />
                • Entre em contato com o suporte técnico<br />
                • Tente usar outro navegador se disponível
              </div>
            </SupportInfo>
          )}

          <ActionButtons>
            <Button className="primary" onClick={this.handleReload}>
              🔄 Recarregar Página
            </Button>
            <Button className="secondary" onClick={this.handleGoHome}>
              🏠 Ir para Home
            </Button>
          </ActionButtons>

          {errorCount > 1 && (
            <ErrorMessage style={{ marginTop: 16, fontSize: 12, color: '#999' }}>
              Erros capturados nesta sessão: {errorCount}
            </ErrorMessage>
          )}
        </ErrorCard>
      </ErrorContainer>
    );
  }
}

export default GlobalErrorBoundary;
