import Functions from '../functions js/FunctionsJS.js';

class Service {
  
  async buscar_nfe(data, typeShearch) {

    const functions = new Functions();

    try {

      let response = null;
      const listPdfsReader = [];

      const filesPdf = data.files;

      // 🔥 valida arquivos
      if (!filesPdf || filesPdf.length === 0) {
        return {
          ok: false,
          error: "Erro ao ler Pdf. Os pdfs estão vazios",
          data: null
        };
      }

      // 🔥 converte PDFs para base64
      for (const file of filesPdf) {

        const filesBase64 = await functions.readPdf(file);

        if (!filesBase64 || !filesBase64.ok) {
          continue;
        }

        listPdfsReader.push({
          data: filesBase64.data,
          name: file.name
        });
      }

      // 🔥 nenhum PDF válido
      if (listPdfsReader.length === 0) {
        return {
          ok: false,
          error: "Nenhum PDF válido encontrado",
          data: null
        };
      }

      // 🔥 payload final
      const payload = {
        ...data,
        files: listPdfsReader
      };

      // 🔥 define endpoint
      if (typeShearch === "nota_fiscal") {

        response = await fetch(
          "https://operator-backend-2l9x.onrender.com/buscar_nota",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          }
        );

      } else if (typeShearch === "embarque") {

        response = await fetch(
          "https://operator-backend-2l9x.onrender.com/buscar_nota",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          }
        );

      } else {

        return {
          ok: false,
          error: "Tipo de busca inválido",
          data: null
        };
      }

      // 🔥 lê resposta da API
      const result = await response.json();

      // 🔥 valida erro backend
      if (result.ok === false) {
        return result;
      }

      // 🔥 salva PDF
      const statusSave = functions.savePdfFromBase64(result);

      return statusSave;

    } catch (error) {

      console.error("Service error:", error);

      return {
        ok: false,
        status: error.message || "Erro inesperado no processamento",
        data: null
      };
    }
  }

  async nfe_service(data) {

    const functions = new Functions();

    try {
    
      const filesResult = await functions.readerFiles(data.files)
      if(!filesResult.ok){
        return filesResult
      }

      const payload = {
        ...data,
        files: filesResult.data
      };

      // 🔥 request API
      const response = await fetch("https://operator-backend-2l9x.onrender.com/set_nfd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      // 🔥 valida resposta backend
      if (!response.ok || !result.ok) {
        return {
          ok: false,
          status: result.error || "Erro na API",
          data: null
        };
      }

      // 🔥 gerar excel
      const excelResult = functions.exportToExcel(result.data);

      if (!excelResult.ok) {
        return {
          ok: false,
          status: "Erro ao gerar Excel",
          data: null
        };
      }

      // ✅ sucesso total
      return excelResult;

    } catch (error) {
      console.error("Service error:", error);

      return {
        ok: false,
        status: "Erro inesperado no processamento",
        data: null
      };
    }
  }

  async guide_service(data){
    const functions = new Functions();
    try{
        //const filesResult = functions.readerFiles(data.files)
        const listPdfsReader = [];

        const filesPdf = data.files
        if(filesPdf.length > 0){
          for (const file of filesPdf) {
                const filesBase64 = await functions.readPdf(file);
                if(!filesBase64){
                  continue
                }
              
                listPdfsReader.push({
                    data: filesBase64.data,
                    name: file.name  // ← Adiciona o nome
                });
            }
        }else{
           return {
              ok: false,
              error: "Erro ao ler Pdf. Os pdfs estão vazios",
              data: null
            };
        }

        const payload = {
          ...data,
          files: listPdfsReader
        };

        // 🔥 request API
     // const response = await fetch("https://operator-backend-2l9x.onrender.com/get_guide", {
      const response = await fetch("https://operator-backend-2l9x.onrender.com/get_guide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const jsonApi = await response.json();
      const result = functions.savePdfFromBase64(jsonApi);
      return result;

    } catch (error) {
      console.error("Service error:", error);

      return {
        ok: false,
        status: "Erro inesperado no processamento",
        data: null
      };
    }
  }



}

export default Service;