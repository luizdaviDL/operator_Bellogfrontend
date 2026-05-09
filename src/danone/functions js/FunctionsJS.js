import * as XLSX from "xlsx";

class Functions {

  async readerFiles(data){
      // 🔥 converter PDFs
      const filesBase64 = await Promise.all(
        data.map(file => this.readPdf(file))
      );

      // 🔥 validar leitura
      const errors = filesBase64.filter(f => !f.ok);

      if (errors.length > 0) {
        return {
          ok: false,
          status: "Erro ao ler um ou mais PDFs",
          data: null
        };
      }

      // 🔥 pegar só base64
      const filesResult = filesBase64.map(f => f.data);
      return {
          ok: true,
          status: "Sucesso na leitura dos pdfs",
          data: filesResult
        };
      
  }

  async readPdf(file) {
    return new Promise((resolve) => {
      try {
        if (!file) {
          return resolve({
            ok: false,
            error: "Nenhum arquivo selecionado",
            data: null
          });
        }

        const reader = new FileReader();

        reader.onload = function (event) {
          try {
            const base64String = event.target.result.split(",")[1];

            resolve({
              ok: true,
              data: base64String,
              error: null
            });

          } catch (e) {
            resolve({
              ok: false,
              error: "Erro ao converter arquivo",
              data: null
            });
          }
        };

        reader.onerror = function (erro) {
          resolve({
            ok: false,
            error: erro,
            data: null
          });
        };

        reader.readAsDataURL(file);

      } catch (e) {
        resolve({
          ok: false,
          error: e,
          data: null
        });
      }
    });
  }

  exportToExcel(data) {
    try {
      if (!data || data.length === 0) {
        return {
          ok: false,
          error: "Dados vazios para exportar",
          data: null
        };
      }

      const worksheet = XLSX.utils.json_to_sheet(data);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "NFE_PISO");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "nfe.xlsx";
      a.click();

      window.URL.revokeObjectURL(url);

      return {
        ok: true,        
        status: "Arquivo gerado com sucesso"
      };

    } catch (error) {
      console.error("Erro ao gerar Excel:", error);

      return {
        ok: false,
        status: error.message || "Erro ao gerar Excel"        
      };
    }
  }



  savePdfFromBase64(response) {
    try {
      // 🔹 validação
      if (!response || !response.finded) {
        return {
          ok: false,
          status: "Arquivo não encontrado"
        };
      }

      const base64 = response.data;
      const filename = response.filename || "arquivo.pdf";

      if (!base64) {
        return {
          ok: false,
          status: "Base64 vazio"
        };
      }

      // 🔥 converter base64 para binário ex: JVBERi0xLjcK... para %PDF-1.7...
      const byteCharacters = atob(base64);
      //Cria um array vazio do tamanho do arquivo.
      const byteNumbers = new Array(byteCharacters.length);
      //LOOP PEGANDO CADA BYTE (binario)
      for (let i = 0; i < byteCharacters.length; i++) {
        //Transforma caractere para número ASCII/binário. ex: "P" -> 80 "D" -> 68 array final [37, 80, 68, 70...]
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      //Uint8Array é um array binário real.
      const byteArray = new Uint8Array(byteNumbers);

      // 🔥 criar blob PDF
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // 🔥 criar download
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();

      window.URL.revokeObjectURL(url);

      return {
        ok: true,
        status: "PDF baixado com sucesso"
      };

    } catch (error) {
      console.error("Erro ao salvar PDF:", error);

      return {
        ok: false,
        status: "Erro ao salvar PDF"
      };
    }
  }
}

export default Functions;




