import React from 'react';
import { useSaveLoad } from '../hooks/useSaveLoad';

interface SaveLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'save' | 'load';
}

const SaveLoadModal = React.memo(({ isOpen, onClose, mode }: SaveLoadModalProps) => {
  const { saveToFile, loadFromFile, exportToClipboard, importFromClipboard } = useSaveLoad();
  const [description, setDescription] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setDescription('');
      setMessage('');
      setLoading(false);
    }
  }, [isOpen]);

  const handleSaveToFile = async () => {
    try {
      setLoading(true);
      saveToFile(description || 'Soccer Tactics Board Save');
      setMessage('Tactics saved successfully!');
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setMessage('Failed to save tactics');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadFromFile = async () => {
    try {
      setLoading(true);
      await loadFromFile();
      setMessage('Tactics loaded successfully!');
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setMessage('Failed to load tactics: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      setLoading(true);
      const success = await exportToClipboard(description || 'Soccer Tactics Board Save');
      if (success) {
        setMessage('Tactics copied to clipboard!');
      } else {
        setMessage('Failed to copy to clipboard');
      }
    } catch (error) {
      setMessage('Failed to copy to clipboard');
    } finally {
      setLoading(false);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      setLoading(true);
      const success = await importFromClipboard();
      if (success) {
        setMessage('Tactics loaded from clipboard!');
        setTimeout(() => onClose(), 1500);
      } else {
        setMessage('Failed to load from clipboard');
      }
    } catch (error) {
      setMessage('Failed to load from clipboard');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '30px',
          maxWidth: '500px',
          width: '90%',
          color: '#ffffff',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '24px',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>

        <h2 style={{ 
          marginBottom: '20px', 
          textAlign: 'center', 
          color: '#ffffff',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          {mode === 'save' ? 'Save Tactics' : 'Load Tactics'}
        </h2>

        {mode === 'save' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#ffffff',
              fontSize: '14px'
            }}>
              Description (optional):
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., 4-4-2 attacking formation"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#ffffff',
                color: '#333333',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
        )}

        {message && (
          <div style={{
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: message.includes('Failed') ? 'rgba(255, 107, 107, 0.2)' : 'rgba(76, 175, 80, 0.2)',
            border: `1px solid ${message.includes('Failed') ? '#ff6b6b' : '#4caf50'}`,
            borderRadius: '4px',
            color: message.includes('Failed') ? '#ff6b6b' : '#4caf50',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '15px'
        }}>
          {mode === 'save' ? (
            <>
              <button
                onClick={handleSaveToFile}
                disabled={loading}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#00bcd4',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Saving...' : '💾 Save to File'}
              </button>
              
              <button
                onClick={handleCopyToClipboard}
                disabled={loading}
                style={{
                  padding: '12px 20px',
                  backgroundColor: 'transparent',
                  border: '2px solid #00bcd4',
                  color: '#00bcd4',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Copying...' : '📋 Copy to Clipboard'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLoadFromFile}
                disabled={loading}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#00bcd4',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Loading...' : '📁 Load from File'}
              </button>
              
              <button
                onClick={handlePasteFromClipboard}
                disabled={loading}
                style={{
                  padding: '12px 20px',
                  backgroundColor: 'transparent',
                  border: '2px solid #00bcd4',
                  color: '#00bcd4',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Pasting...' : '📋 Paste from Clipboard'}
              </button>
            </>
          )}
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#666666',
              border: 'none',
              color: '#ffffff',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

SaveLoadModal.displayName = 'SaveLoadModal';

export default SaveLoadModal;